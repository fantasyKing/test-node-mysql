import test from 'ava';
import rq from 'request-promise';
import moment from 'moment';

test('test', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:4040/v1/online/save',
    body: {
      // broadcastId: 1,
      sessionId: 10,
      storageStatus: 1,
      url: 'test',
      onlineView: 100,
      startTime: moment().utc(),
      stopTime: moment(),
      broadcastTitle: 'test',
      price: 100
    },
    json: true
  };
  try {
    const result = await rq(options);
    console.log('result', result);
    t.truthy(result);
  } catch (err) {
    console.log('err', err);
    t.falsy(err);
  }
});
