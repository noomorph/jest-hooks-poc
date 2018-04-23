const coordinator = require('./coordinator.js');

class JasmineReporter {
  // jasmineStarted(suiteInfo) {
  //   coordinator.todos = [
  //     ...coordinator.todos,
  //     coordinator.hooks.beforeAll.map(async (fn) => await fn(null)),
  //   ];
  // }

  specStarted(result) {
    const spec = coordinator.currentSpec = Object.freeze({
      title: result.description,
      fullName: result.fullName,
      status: 'running',
    });
  }

  specDone(result) {
    const spec = Object.freeze(Object.assign({}, coordinator.currentSpec, {
      status: result.status,
    }));

    coordinator.currentSpec = null;

    coordinator.todos = coordinator.todos.then(() => {
      const todos = coordinator.hooks.afterEach.map(async (fn) => await fn(spec));
      return Promise.all(todos);
    });
  }

  // jasmineDone(result) {
  //   coordinator.todos = [
  //     ...coordinator.todos,
  //     coordinator.hooks.afterAll.map(async (fn) => await fn(null)),
  //   ];
  // }

  // suiteStarted(result) {
  //   console.log('JasmineReporter.suiteStarted', result.testPath);
  //   debugger;
  // }

  // suiteDone(result) {
  //   console.log('JasmineReporter.suiteDone');
  //   debugger;
  // }
}

module.exports = JasmineReporter;
