/**
 * Created by zhangyuan on 15/12/7.
 */
import Sequelize from 'sequelize';
export default {
  modelName: 'CastBroadcast',
  attributes: {
    broadcastId: {
      type: Sequelize.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    sessionId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    storageStatus: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    url: {
      type: Sequelize.STRING
    },
    onlineView: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    startTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    stopTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    broadcastTitle: {
      type: Sequelize.STRING
    },
    price: {
      type: Sequelize.INTEGER
    }
  },
  options: {
    tableName: 'cast_broadcast'
  }
};
