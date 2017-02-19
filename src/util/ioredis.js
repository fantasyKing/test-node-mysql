/**
 * Created on 5/11/16.
 */
import Redis from 'ioredis';
import _ from 'lodash';

import config from './../config';

const createClient = function createClient(name, conf) {
  if (typeof conf !== 'object' || !conf.redis) {
    throw new Error('Invalid redis config');
  }
  const client = new Redis(conf.redis);
  client.on('error', e => {
    console.error('redis', name, 'connect error ', e, e.stack);
  });
  client.on('ready', () => {
    console.log('redis', name, 'ready');
  });
  client.on('connect', () => {
    console.log('redis', name, 'connect');
  });
  return client;
};

const bind = function bind(fromObj, toObj) {
  for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(fromObj))) {
    toObj[key] = Object.getPrototypeOf(fromObj)[key];
  }
  return toObj;
};

const randomNum = function randomNum() {
  return Math.floor(Math.random() * 3 + 1);
};

class redisClientExtend {
  /**
   * @param  [] keys
   * @tips 只适用于value为jsonstring
   */
  async getByKeys(keys) {
    const values = [];
    const empty = [];
    try {
      if (!Array.isArray(keys) || !keys.length) {
        return { values, empty };
      }
      keys = _.uniq(keys);
      const res = await this.mget(keys);
      for (let i = 0; i < keys.length; i++) {
        if (!res[i]) {
          empty.push(keys[i]);
          continue;
        }
        values.push(JSON.parse(res[i]));
      }
      return { values, empty };
    } catch (err) {
      logger.error({ err, params: values }, 'ioRedisClient.getByKeys.error');
      return { values, empty: keys };
    }
  }

  async setById(values) {
    let flag = true;
    try {
      const type = toString.call(values);
      if (type === '[object Array]' && values.length) {
        for (const val of values) {
          if (!val || !val.id) {
            continue;
          }
          await this.set(val.id, JSON.stringify(val));
          await this.expire(val.id, 60 * 60 * 24 * randomNum());// 1-3天
        }
        return flag;
      }
      if (type === '[object Object]') {
        if (!values.id) {
          flag = false;
        }
        await this.set(values.id, JSON.stringify(values));
        await this.expire(values.id, 60 * 60 * 24 * randomNum());// 1-3天
        return flag;
      }
      return false;
    } catch (err) {
      logger.error({ err, params: values }, 'ioRedisClient.getById.error');
      return false;
    }
  }

  async getById(id) {
    try {
      const res = await this.get(id);
      if (!res) {
        return null;
      }
      return JSON.parse(res);
    } catch (err) {
      logger.error({ err, params: id }, 'ioRedisClient.getById.error');
      return null;
    }
  }

  async delKey(key) {
    try {
      return await this.del(key);
    } catch (err) {
      logger.error({ err, params: key }, 'ioRedisClient.del.error');
      return 0;
    }
  }

  async newSet(key, val) {
    try {
      return await this.set(key, val);
    } catch (err) {
      console.log('redis err', err);
      return 0;
    }
  }

  async newGet(key) {
    try {
      return await this.get(key);
    } catch (err) {
      console.log('redis err', err);
      return null;
    }
  }
}

const redisClient = createClient('IoredisClient', config);
const extendRedis = new redisClientExtend();

export default bind(extendRedis, redisClient);
