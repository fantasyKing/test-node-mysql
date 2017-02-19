/**
 * Created on 5/8/16.
 */
import Base from './../../base';
import Online from './../../../controller/online';

export default new class extends Base {

  /**
   * 测试接口
   * @method POST
   * @url /user/test
   * @param req
   * @param res
   * @param params
   */
  saveInfo = async (req, res, params) => {
    try {
      const result = await Online.saveInfo(params);
      this.ok(res, result);
    } catch (e) {
      this.fail(res)(e);
    }
  };
};
