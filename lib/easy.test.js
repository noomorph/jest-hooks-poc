const sleep = require('./sleep');

it('passing test', async () => {
  console.log('test should pass');
});

it('failing test', async () => {
  throw new Error('test should fail');
});
