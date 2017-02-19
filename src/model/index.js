/**
 * Created by zhangyuan on 15/12/3.
 */
import sequelize from '../sequelize/index';
import online from './online';
const modelDefines = {
  online
};

const SeqModels = {};

Object.keys(modelDefines).forEach(key => {
  const md = modelDefines[key];
  SeqModels[md.modelName] = sequelize.define(md.modelName, md.attributes, md.options);
});

const models = Object.assign({}, SeqModels);

export default models;
