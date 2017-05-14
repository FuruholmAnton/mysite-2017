import 'module-alias/register';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { getData, updateData } from './server/functions';
import bodyParser from 'body-parser';
import * as firebase from 'firebase-admin';

import NotFoundPage from './pages/NotFound.jsx';

import serviceAccount from './config/firebase.json';

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://myhub-c0e0c.firebaseio.com/',
});

// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

/* Makes it possible to read from req.body on AJAX calls */
app.use(bodyParser.json());

app.post('/ajax', (req, res) => {
  let body = req.body;
  let output = {};
  console.log(req.body);


  if (body != null && body.function != null && typeof body.function === 'string') {
    if (body.function === 'getData') {
      console.log('AJAX! getData');
      getData('data/firebase.json').then((response) => {
        output = {
          data: response,
        };
        res.json(output);
      });
    } else if (body.function === 'updateData') {
      console.log('AJAX! updateData');
      output = {
        res: 'From server',
      };
    } else {
      console.log('AJAX! Something went wrong');
    }
  } else {
    console.log('AJAX! Something went wrong');
  }
});

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  console.info(`Server running on http://localhost:${port} [${env}]`);
});
