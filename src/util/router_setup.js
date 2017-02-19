/**
 * Created on 5/6/16.
 */

import validator from './validator';
import { paramsParser, auth } from './../policy/';

function handler(route) {
  return (req, res, next) => {
    const params = Object.assign({}, req.params);
    const error = validator.checkParamType(params, route[4], route[5], route[6]);

    const x_app_id = req.headers['x-app-id'];
    if (params.app_id) {
      x_app_id && (params.x_app_id = x_app_id);
    } else {
      x_app_id && (params.app_id = x_app_id);
    }
    if (req.ms_request_id) {
      params.ms_request_id = req.ms_request_id;
    }
    if (error.length) {
      return res.send({ code: 0, message: error.join(',') });
    }
    return route[3](req, res, params);
  };
}
/**
routes = {
  passport: [
    [method, route, [middlewares], handler, [params], [params_options], [params_types]]
  ]
}
 */
export default function (router, rootRouter, routes) {
  for (const key of Object.keys(routes)) {
    const elements = routes[key];
    for (const element of elements) {
      const method = element[0].toLowerCase();
      if (key !== '/') {
        router[method](`/${key}${element[1]}`, element[2], paramsParser.json, auth.verify, handler(element));
      } else {
        rootRouter[method](element[1], element[2], paramsParser.json, auth.verify, handler(element));
      }
    }
  }
}
