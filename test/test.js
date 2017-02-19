import test from 'ava';
import rq from 'request-promise';

test('test', async t => {
  const options = {
    method: 'POST',
    uri: 'http://localhost:4040/v1/online/save',
    body: {
      id: 1
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
