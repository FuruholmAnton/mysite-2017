import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
import Root from './AppRoutes';

const render = (Component) => {
  ReactDOM.render(
		<AppContainer>
      <Component />
  	</AppContainer>,
    document.getElementById('app')
  );
};

render(Root);

module.hot.accept('./AppRoutes', () => {
  render(Root)
});

/*render(
    <AppContainer>
        <Root/>
    </AppContainer>,
    document.getElementById('app')
);*/

/*if (module.hot) {
    module.hot.accept('./AppRoutes', () => {
        const NewRoot = require('./AppRoutes').default;
        render(
            <AppContainer>
                <NewRoot />
            </AppContainer>,
            document.getElementById('app')
        );
    });
}*/
