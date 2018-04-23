const sleep = require('./sleep');
const coordinator = require('./coordinator');

function initVideoPlugin() {
  let pid = 0;
  let filename = '';
  let saveToFileSystemTasks = [];

  coordinator.hooks.beforeAll.push(async () => {
    console.log('connecting to device...');
    await sleep();
    console.log('connected');
  });

  coordinator.hooks.beforeEach.push(async (spec) => {
    filename = '/sdcard/' + spec.fullName + '.mp4';
    console.log('starting to write video to: ', filename);
    await sleep();

    pid = Math.floor(Math.random() * 10000) + 100;
    console.log(`video recording process PID=${pid} created, going to test...`);
    await sleep();
  });

  coordinator.hooks.afterEach.push(async (spec) => {
    console.log('sending kill signal to process pid = ', pid);
    await sleep();
    console.log('killed process', pid, 'successfully');

    if (spec.status === 'passed') {
      console.log('spec', spec.title, 'passed so we delete the file', filename);
      await sleep();
      console.log(filename, 'was deleted succesfully');
    } else {
      console.log('spec', spec.title, 'failed so we keep the file', filename);

      saveToFileSystemTasks.push((async function (fname) {
        const time = Math.random() * 10000 + 5000;
        console.log('moving file', fname, 'will take', time, 'milliseconds');
        await sleep(time);
        console.log('moved file', fname, 'succesfully');
      }(filename)));
    }
  });

  coordinator.hooks.afterAll.push(async () => {
    console.log('ensuring all', saveToFileSystemTasks.length, 'failure videos are saved to local file system...');
    await Promise.all(saveToFileSystemTasks);
    console.log('all done, we can quit, hurray');
  });
}

module.exports = initVideoPlugin;
