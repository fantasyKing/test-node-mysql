/**
 * Created on 5/6/16.
 */

export default class {
  ok = (res, data, wrap) => {
    return res.json({ code: 1, result: wrap ? { data } : data });
  };

  fail = (res) => {
    const result = (e) => {
      let code = -1;
      if (typeof e === 'string') {
        code = e;
      } else if (typeof e === 'object') {
        code = e.message;
      }
      res.json({ code: 0, message: code });
    };
    return result;
  }
}
