/**
 * Created by zhangyuan on 15/12/7.
 */
import Sequelize from 'sequelize';
import timestamp from 'sequelize-mysql-timestamp';

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
      allowNull: true,
      default: 0
    },
    storageStatus: {
      type: Sequelize.INTEGER,
      allowNull: false,
      default: 0
    },
    url: {
      type: Sequelize.STRING
    },
    onlineView: {
      type: Sequelize.INTEGER,
      allowNull: true,
      default: 0
    },
    startTime: {
      type: timestamp,
      allowNull: false
    },
    stopTime: {
      type: timestamp,
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
