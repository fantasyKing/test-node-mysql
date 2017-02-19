/**
 * Created on 5/6/16.
 */
import express from 'express';
import api from './api';
import routerSetup from './../util/router_setup';

const apiRouter = express.Router();
const rootRouter = express.Router();

routerSetup(apiRouter, rootRouter, api);

export default {
  apiRouter,
  rootRouter
};
