/**
 * Created on 5/8/16.
 */
import Base from '../base';
import User from './../../../controller/user';

export default new class extends Base {

  /**
   * 测试接口
   * @method POST
   * @url /user/test
   * @param req
   * @param res
   * @param params
   */
  test = async (req, res, params) => {
    try {
      logger.info({ req: params, params }, 'router.api.user.usertest');

      const result = await User.test(params);

      logger.info({ req: params, result }, 'router.api.user.usertest');
      this.ok(res, result);
    } catch (e) {
      logger.error({ req: params, err: e, params }, 'router.api.user.usertest');
      this.fail(res)(e);
    }
  };
}
