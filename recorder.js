function Recorder(canvas, framesToRecord, framerate = 60, quality = 99, verbose = true) {
  this.framesRecorded = 0;
  this.recording = false;
  this.saved = false;
  this.canvas = canvas;
  this.framesToRecord = framesToRecord;
  this.capturer = new CCapture({ format: 'webm', framerate, quality, verbose });
}

Recorder.prototype.startRecording = function() {
  if (!this.recording) {
    this.capturer.start();
    this.recording = true;
  }
}

Recorder.prototype.capture = function() {
  if (this.recording) {
    if (this.framesRecorded <= this.framesToRecord) {
      this.capturer.capture(this.canvas);
    } else if (!this.saved) {
      this.stopRecording();
    }
  }
}

Recorder.prototype.stopRecording = function () {
  this.capturer.stop();
  this.capturer.save();
  this.saved = true;
  this.recording = false;
}