const VideoRecordingPlugin = require('./VideoRecordingPlugin');

class FakeDetox {
  constructor() {
    this.hooks = {
      onStart: [],
      beforeTest: [],
      afterTest: [],
      onExit: [],
    };
  }

  registerPlugin(plugin) {
    if (typeof plugin.onStart === 'function') {
      this.hooks.onStart.push(plugin.onStart.bind(plugin));
    }
    if (typeof plugin.beforeTest === 'function') {
      this.hooks.beforeTest.push(plugin.beforeTest.bind(plugin));
    }
    if (typeof plugin.afterTest === 'function') {
      this.hooks.afterTest.push(plugin.afterTest.bind(plugin));
    }
    if (typeof plugin.onExit === 'function') {
      this.hooks.onExit.push(plugin.onExit.bind(plugin));
    }

    return this;
  }

  async executeHooks(name, ...args) {
    const hooks = this.hooks[name];
    const tasks = hooks.map(async (hook) => await hook(...args));

    try {
      await Promise.all(tasks);
    } catch (e) {
      console.log('some hooks failed on', name, '. see for yourself:', e);
    }
  }

  async init(config) {
    console.log('do Detox init with config:', config);
    await this.executeHooks('onStart');
  }

  async beforeEach(spec) {
    await this.executeHooks('beforeTest', spec);
  }

  async afterEach(spec) {
    await this.executeHooks('afterTest', spec);
  }

  async cleanup() {
    await this.executeHooks('onExit');
  }
}

const instance = new FakeDetox().registerPlugin(new VideoRecordingPlugin());

module.exports = {
  FakeDetox,
  default: instance,
};
