const sleep = require('./sleep');

beforeAll(async () => {
  console.log('install app');
  await sleep();
  console.log('app is installed');
});

beforeEach(async () => {
  console.log('reload app');
  await sleep();
  console.log('app is reloaded');
});

afterEach(async () => {
  console.log('exit app');
  await sleep();
  console.log('now we are in main manu');
});

afterAll(async () => {
  console.log('uninstall app');
  await sleep();
  console.log('app is uninstalled');
});

it('do test - ok', async () => {
  console.log('tap on enabled button');
  await sleep();
  console.log('we are fine');
});

it('do test - failing 1', async () => {
  console.log('tap on disabled button 1');
  await sleep();
  throw new Error('something is wrong');
});

it('do test - failing 2', async () => {
  console.log('tap on disabled button 2');
  await sleep();
  throw new Error('something is wrong');
});
