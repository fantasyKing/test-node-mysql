import onlineProxy from './../proxy/online';

export default new class {
  saveInfo = async (params) => {
    const result = await onlineProxy.saveOnlineInfo(params);
    return result;
  }
};
