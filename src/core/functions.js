import routes from '../routes';
import vent from './eventEmitter.js';

export const getRoutesList = function() {
    let rs = routes.props.children.filter((item) => {
      if (!item) return false;
      return item.props.show;
    });

    return rs.map((item) => item.props) || [];
};


export const onRouteChange = function(previousRoute, nextRoute) {
  console.log('Route changed');
  // TODO: Check how to send params
  vent.emit('route:changed', nextRoute);
};
