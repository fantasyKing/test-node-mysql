import { CastBroadcast } from './../model/';
import redis from './../util/ioredis';

export default new class {
  saveOnlineInfo = async (params) => {
    try {
      console.log('proxy.params', params);
      const { broadcastId } = params;
      params.storageStatus = parseInt(params.storageStatus);
      let result = '';
      if (broadcastId) { // update
        result = await CastBroadcast.update(params, { where: { broadcastId } });
      } else {
        result = await CastBroadcast.create(params, {});
      }
      await redis.set(result.broadcastId, result.startTime);
      console.log('proxy.result', result);
      return result;
    } catch (err) {
      throw err;
    }
  }
};
