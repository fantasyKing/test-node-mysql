/**
 * Created by zhangyuan on 15/12/3.
 */

import Sequelize from 'sequelize';
import { payDatasource } from '../datasource';

import CommonStaticMethods from './common_static_method';

const basicDefines = {
  classMethods: CommonStaticMethods,
  instanceMethods: {
    // method2() { // this ref instance, this.attr
    // }
  }
};

const options = {
  dialect: 'mysql',
  host: payDatasource.host,
  define: {
    ...basicDefines,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    engine: 'InnoDB'
  },
  logging(){
  },
  raw: true
};

if (payDatasource.port) {
  options.port = payDatasource.port;
}

if (payDatasource.pool) {
  options.pool = payDatasource.pool;
}
const _seq = new Sequelize(payDatasource.db, payDatasource.user, payDatasource.pass, options);

export default _seq;
