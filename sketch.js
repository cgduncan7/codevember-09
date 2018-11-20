/**
 * sketch
 */
var s = function(sketch) {
  // #region settings
  const framerate = 60;
  const w = window.innerWidth;
  const h = window.innerHeight;
  // #endregion

  var green;

  // #region p5
  sketch.setup = function() {
    const p5canvas = sketch.createCanvas(w, h);
    canvas = p5canvas.canvas;
    sketch.frameRate(framerate);
    green = new Green(sketch);
  }

  sketch.draw = function() {
    sketch.background(128, 200, 255);
    green.update();
    green.draw();
  }
  // #endregion
};

var sketch = new p5(s, document.getElementById('sketch'));