/**
 * Created by zhangyuan on 15/12/9.
 */

let buildQuery = (projects, conditions, options) => {
  let query = {};
  if (projects) { // map attributes
    let includes = [];
    let excludes = [];
    for (let attr in projects) {
      if (attr == '__fns__') { // fns include
        includes.concat(projects[attr]);
      } else {
        if (projects[attr]) {
          includes.push(attr);
        } else {
          excludes.push(attr);
        }
      }
    }
    if (includes.length || excludes.length) {
      query.attributes = {includes, excludes};
    }
  }

  if (conditions) { // map where
    query.where = conditions;
  }
  if (options) { // map condition
    if (options.skip) {
      query.offset = options.skip;
    }
    if (options.limit) {
      query.limit = options.limit;
    }
    if (options.order) {
      query.order = options.order;
    }
  }
  return query;
};
export default {
  async simpleQuery(pojections, conditions, options) {
    const rs = await this.findAll(buildQuery(pojections, conditions, options));
    return rs;
  },
  async simpleQueryOne(pojections, conditions, options) {
    const rs = await this.findOne(buildQuery(pojections, conditions, options));
    return rs;
  },
  async simpleCount(conditions, options) {
    const rs = await this.count(buildQuery(null, conditions, options));
    return rs;
  }
};
