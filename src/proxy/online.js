import { CastBroadcast } from './../model/';

export default new class {
  saveOnlineInfo = async (params) => {
    try {
      console.log('proxy.params', params);
      // const { broadcastId } = params;
      // let result = '';
      // if (broadcastId) { // update
      //   result = await CastBroadcast.update(params);
      // } else {
      //   result = await CastBroadcast.create(params);
      // }
      // console.log('proxy.result', result);
      return true;
    } catch (err) {
      throw err;
    }
  }
};
