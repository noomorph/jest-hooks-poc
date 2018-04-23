const sleep = require('./lib/sleep');
const coordinator = require('./lib/coordinator');
const JasmineReporter = require('./lib/JasmineReporter');
const initVideoPlugin = require('./lib/videoPlugin');

jasmine.getEnv().addReporter(new JasmineReporter());

beforeAll(async () => {
  await coordinator.executeHooks('beforeAll');
}, 30000);

beforeEach(async () => {
  await coordinator.executeHooks('beforeEach');
}, 30000);

afterAll(async () => {
  await coordinator.executeHooks('afterAll');
}, 30000);

initVideoPlugin();
