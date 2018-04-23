const sleep = require('../lib/sleep');

class JestReporter {
  constructor(globalConfig, options) {
    this._globalConfig = globalConfig;
    this._options = options;

    console.log('JestReporter.constructor');
  }

  async onRunStart(results, options) {
    console.log('JestReporter.onRunStart [0]');
    debugger;
    await sleep();
    console.log('JestReporter.onRunStart [1]');
  }

  async onTestStart(test) {
    console.log('JestReporter.onTestStart [begin]', test.path);
    debugger;
    await sleep();
    console.log('JestReporter.onTestStart [end]');
  }

  async onTestResult(test, testResult, aggregatedResult) {
    console.log('JestReporter.onTestResult [0]');
    debugger;
    await sleep();
    console.log('JestReporter.onTestResult [1]');
  }

  async onRunComplete(contexts, results) {
    console.log('JestReporter.onRunComplete [0]');
    debugger;
    await sleep();
    console.log('JestReporter.onRunComplete [1]');
  }

  getLastError() {
    return (void 0); // if (this._shouldFail) { // return new Error('my-custom-reporter.js reported an error'); // }
  }
}

module.exports = JestReporter;
