const sleep = require('./utils/sleep');

class VideoRecordingPlugin {
  constructor() {
    this.pid = 0;
    this.filename = '';
    this.pendingJobs = [];
  }

  async onStart() {
    await this._connectToDevice();
  }

  async beforeTest(spec) {
    await this._startRecording(spec.fullName);
  }

  async afterTest(spec) {
    await this._killProcess();

    if (spec.status === 'passed') {
      this._deleteFile(spec.title);
    } else {
      console.log('spec', spec.title, 'failed so we keep the file', this.filename);
      const job = this._createBackgroundCopyJob(this.filename);

      this.pendingJobs.push(job);
    }
  }

  async onExit() {
    await this._flushJobs();
  }

  /* private methods */

  async _connectToDevice() {
    console.log('connecting to device...');
    await sleep();
    console.log('connected to device successfully.');
  }

  async _startRecording(filename) {
    this.filename = '/sdcard/' + filename + '.mp4';
    console.log('starting to write video to: ', this.filename);
    await sleep();

    this.pid = Math.floor(Math.random() * 10000) + 100;
    console.log(`video recording process PID=${this.pid} created, going to test...`);
    await sleep();
  }

  async _killProcess() {
    console.log('sending kill signal to process pid = ', this.pid);
    await sleep();
    console.log('killed process', this.pid, 'successfully');
  }

  async _deleteFile(specTitle) {
    console.log('spec', specTitle, 'passed so we delete the file', this.filename);
    await sleep();
    console.log(this.filename, 'was deleted succesfully');
  }

  async _createBackgroundCopyJob(filename) {
    const time = Math.random() * 10000 + 5000;
    console.log('moving file', filename, 'will take', time, 'milliseconds');
    await sleep(time);
    console.log('moved file', filename, 'succesfully');
  }

  async _flushJobs() {
    console.log('ensuring all', this.pendingJobs.length, 'failure videos are saved to local file system...');
    await Promise.all(this.pendingJobs);
    console.log('all done, we can quit, hurray');
  }
}

module.exports = VideoRecordingPlugin;
