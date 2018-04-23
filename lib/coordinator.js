const coordinator = {
  currentSpec: null, /* { title: '', fullTitle: '', status: '' } */
  todos: Promise.resolve(),
  hooks: {
    beforeAll: [],
    beforeEach: [],
    afterEach: [],
    afterAll: [],
  },
  executeHooks: async (phase) => {
    const hooks = coordinator.hooks[phase];
    const spec = coordinator.currentSpec;

    coordinator.todos = coordinator.todos.then(() => {
      return Promise.all(hooks.map(async (hook) => await hook(spec)));
    });

    await coordinator.todos;
  },
};

module.exports = coordinator;
