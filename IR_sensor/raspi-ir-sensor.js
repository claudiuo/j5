var five = require("johnny-five");
var Raspi = require("raspi-io");
var board = new five.Board({
  io: new Raspi()
});

// board.on("ready", function() {
//   var led = new five.Led("P1-13");
//   led.blink();
// });

board.on("ready", function() {

  // Create a new `motion` hardware instance.
  // GPIO17 = P1-11 (main header) = 0 (wiringPi)
  var motion = new five.IR.Motion(P1-11);

  // "calibrated" occurs once, at the beginning of a session,
  motion.on("calibrated", function() {
    console.log("calibrated", Date.now());
  });

  // "motionstart" events are fired when the "calibrated"
  // proximal area is disrupted, generally by some form of movement
  motion.on("motionstart", function() {
    console.log("motionstart", Date.now());
  });

  // "motionend" events are fired following a "motionstart" event
  // when no movement has occurred in X ms
  motion.on("motionend", function() {
    console.log("motionend", Date.now());
  });
});