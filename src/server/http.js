/**
 * Created on 5/5/16.
 */
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import requestId from 'request-id/express';

class HTTP {
  constructor(opts) {
    if (!opts.port) {
      throw new Error('http `port` should not be null.');
    }
    this.port = opts.port;
    this.app = express();
    this.app.use(requestId({
      paramName: 'ms_request_id'
    }));
    morgan.token('id', req => String(req.ms_request_id));
    morgan.token('params', req => JSON.stringify(req.params || {}));
    morgan.token('type', () => 'access-log');
    morgan.token('app', () => 'saas-third-open-api');
    this.use(morgan('[:date[iso]] [:type] :app [:id] [:method] [:url] [:status] [:response-time] :params'));

    this.use(cors());
    this.use(bodyParser.json({ limit: '64mb' }));
    this.use(bodyParser.urlencoded({ limit: '64mb', extended: true, parameterLimit: 1000000 }));
    this.use(compression());

    this.app.all('*', (req, res, next) => {
      req.header('Access-Control-Request-Headers', '*');
      res.header('Access-Control-Allow-Origin', '*');
      res.header('X-Frame-Options', 'DENY');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-app-id');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
      next();
    });
  }

  errorLog = (e, req, res, next) => {
    logger.error(req.path, 'error = ', e, e.stack);
    next(e);
  };

  clientErrorHandler = (e, req, res, next) => {
    if (req.xhr) {
      return res.send({ code: 0, message: '请求异常' });
    }
    return next(e);
  };

  errorHandler = (e, req, res, next) => {
    logger.error(e, e.stack);
    res.statusCode = 500;
    res.send({ code: 500 });
  };

  notFoundHandler = (req, res, next) => {
    res.statusCode = 404;
    res.end();
  };

  use = (...args) => {
    this.app.use.apply(this.app, args);
  };

  start = () => {
    this.use(this.notFoundHandler);
    this.use(this.errorLog);
    this.use(this.clientErrorHandler);
    this.use(this.errorHandler);

    const server = this.app.listen(this.port, () => {
      console.log('http listen on', this.port);
      console.log('http run at env:', process.env.NODE_ENV);
    });

    process.on('SIGINT', () => {
      console.log('http exiting...');
      server.close(() => {
        console.log('http exited.');
        process.exit(0);
      });
    });
  }
}

export default HTTP;
