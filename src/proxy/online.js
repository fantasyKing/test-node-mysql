import { CastBroadcast } from './../model/';

export default new class {
  saveOnlineInfo = async (params) => {
    try {
      const { broadcastId } = params;
      let result = '';
      if (broadcastId) { // update
        result = await CastBroadcast.update(params);
      } else {
        result = await CastBroadcast.create(params);
      }
      console.log('proxy.result', result);
      return result;
    } catch (err) {
      throw err;
    }
  }
};
