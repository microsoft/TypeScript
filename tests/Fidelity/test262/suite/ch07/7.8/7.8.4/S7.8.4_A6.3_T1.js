// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * \x HexDigit HexDigit SingleStringCharacter
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A6.3_T1.js
 * @description Check similar to ('\x01F' === String.fromCharCode('1') + 'F')
 */

//CHECK#1
if ('\x01F' !== String.fromCharCode('1') + 'F') {
  $ERROR("#1: '\x01F' === String.fromCharCode('1') + 'F'");
}

//CHECK#2
if ('\x02E' !== String.fromCharCode('2') + 'E') {
  $ERROR("#2: '\x02E' === String.fromCharCode('2') + 'E'");
}

//CHECK#3
if ('\x03D' !== String.fromCharCode('3') + 'D') {
  $ERROR("#3: '\x03D' === String.fromCharCode('3') + 'D'");
}

//CHECK#4
if ('\x04C' !== String.fromCharCode('4') + 'C') {
  $ERROR("#4: '\x04C' === String.fromCharCode('4') + 'C'");
}

//CHECK#5
if ('\x05B' !== String.fromCharCode('5') + 'B') {
  $ERROR("#5: '\x05B' === String.fromCharCode('5') + 'B'");
}

//CHECK#6
if ('\x06A' !== String.fromCharCode('6') + 'A') {
  $ERROR("#6: '\x06A' === String.fromCharCode('6') + 'A'");
}

//CHECK#7
if ('\x079' !== String.fromCharCode('7') + '9') {
  $ERROR("#7: '\x079' === String.fromCharCode('7') + '9'");
}

//CHECK#8
if ('\x088' !== String.fromCharCode('8') + '8') {
  $ERROR("#8: '\x088' === String.fromCharCode('8') + '8'");
}

//CHECK#9
if ('\x097' !== String.fromCharCode('9') + '7') {
  $ERROR("#9: '\x097' === String.fromCharCode('9') + '7'");
}

//CHECK#A
if ('\x0A6' !== String.fromCharCode('10') + '6') {
  $ERROR("#A: '\x0A6' === String.fromCharCode('10') + '6'");
}

//CHECK#B
if ('\x0B5' !== String.fromCharCode('11') + '5') {
  $ERROR("#B: '\x0B5' === String.fromCharCode('11') + '5'");
}

//CHECK#C
if ('\x0C4' !== String.fromCharCode('12') + '4') {
  $ERROR("#C: '\x0C4' === String.fromCharCode('12') + '4'");
}

//CHECK#D
if ('\x0D3' !== String.fromCharCode('13') + '3') {
  $ERROR("#D: '\x0D3' === String.fromCharCode('13') + '3'");
}

//CHECK#E
if ('\x0E2' !== String.fromCharCode('14') + '2') {
  $ERROR("#E: '\x0E2' === String.fromCharCode('14') + '2'");
}

//CHECK#F
if ('\x0F1' !== String.fromCharCode('15') + '1') {
  $ERROR("#F: '\x0F1' === String.fromCharCode('15') + '1'");
}

