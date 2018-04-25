const { default: detox } = require('../lib/FakeDetox');
const { default: jestAdapter } = require('../lib/DetoxJestAdapter');
const timeout = 30000;

jasmine.getEnv().addReporter(jestAdapter);

beforeAll(async () => {
  await detox.init({ some: 'config' });
}, timeout);

beforeEach(async () => {
  await jestAdapter.beforeEach();
}, timeout);

afterAll(async () => {
  await jestAdapter.afterAll();
  await detox.cleanup();
}, timeout);
