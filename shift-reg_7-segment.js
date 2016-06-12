/**
 * This example uses a single seven-segment display (common anode) and a
 * 74HC595 shift register. See seven-segment.png for wiring.
 */
var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function() {
  /*

    This assumes the segments are as follows:

       A
      ---
    F | | B
      --- <---- G
    E | | C
      ---
       D  o DP

   */

  var isCommonAnode = true;
  var digits = [
    //        .GFEDCBA
    parseInt("00111111", 2),
    parseInt("00000110", 2),
    parseInt("01011011", 2),
    parseInt("01001111", 2),
    parseInt("01100110", 2),
    parseInt("01101101", 2),
    parseInt("01111101", 2),
    parseInt("00000111", 2),
    parseInt("01111111", 2),
    parseInt("01101111", 2),
    parseInt("10000000", 2)
  ];

  var segments = {
    //           .GFEDCBA
    a: parseInt("00000001", 2),
    b: parseInt("00000010", 2),
    c: parseInt("00000100", 2),
    d: parseInt("00001000", 2),
    e: parseInt("00010000", 2),
    f: parseInt("00100000", 2),
    g: parseInt("01000000", 2),
    dp: parseInt("10000000", 2)
  };

  var register = new five.ShiftRegister({
    pins: {
      data: 2,  // SER_IN (pin 14)
      clock: 3, // Clock (pin 11)
      latch: 4  // Latch (pin 12)
    }
  });

  var led = new five.Led(5);

  function invert(num) {
    return ((~num << 24) >> 24) & 255;
  }

  function digit(num) {
    clear();

    register.send(
      isCommonAnode ? invert(digits[num]) : digits[num]
    );
  }

  function segment(s) {
    clear();

    register.send(
      isCommonAnode ? invert(segments[s]) : segments[s]
    );
  }

  function clear() {
    register.send(
      isCommonAnode ? 255 : 0
    );
  }

  var i = 10;

  function next() {
    led.stop();
    digit(i--);

    if (i < 0) {
      i = 10;
      led.strobe(50);
      setTimeout(next, 2000);
    } else {
      setTimeout(next, 1000);
    }
  }

  // when first running, all segments are lit and it looks bad
  // so I added a call to clear() and then delayed next() a bit
  // to make sure all segments are indeed dark after clear() is called
  clear();
  setTimeout(next,3000);
  // next();
});