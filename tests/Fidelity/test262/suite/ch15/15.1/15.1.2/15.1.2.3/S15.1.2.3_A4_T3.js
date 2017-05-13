// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Compute the longest prefix of Result(2), which might be Result(2) itself,
 * which satisfies the syntax of a StrDecimalLiteral
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A4_T3.js
 * @description StrDecimalLiteral not contain HexIntegerLiteral
 */

//CHECK#0
if (parseFloat("0x0") !== 0) {
  $ERROR('#0: parseFloat("0x0") === 0. Actual: ' + (parseFloat("0x0")));
}

//CHECK#1
if (parseFloat("0x1") !== 0) {
  $ERROR('#1: parseFloat("0x1") === 0. Actual: ' + (parseFloat("0x1")));
}

//CHECK#2
if (parseFloat("0x2") !== 0) {
  $ERROR('#2: parseFloat("0x2") === 0. Actual: ' + (parseFloat("0x2")));
}

//CHECK#3
if (parseFloat("0x3") !== 0) {
  $ERROR('#3: parseFloat("0x3") === 0. Actual: ' + (parseFloat("0x3")));
}

//CHECK#4
if (parseFloat("0x4") !== 0) {
  $ERROR('#4: parseFloat("0x4") === 0. Actual: ' + (parseFloat("0x4")));
}

//CHECK#5
if (parseFloat("0x5") !== 0) {
  $ERROR('#5: parseFloat("0x5") === 0. Actual: ' + (parseFloat("0x5")));
}

//CHECK#6
if (parseFloat("0x6") !== 0) {
  $ERROR('#6: parseFloat("0x6") === 0. Actual: ' + (parseFloat("0x6")));
}

//CHECK#7
if (parseFloat("0x7") !== 0) {
  $ERROR('#7: parseFloat("0x7") === 0. Actual: ' + (parseFloat("0x7")));
}

//CHECK#8
if (parseFloat("0x8") !== 0) {
  $ERROR('#8: parseFloat("0x8") === 0. Actual: ' + (parseFloat("0x8")));
}

//CHECK#9
if (parseFloat("0x9") !== 0) {
  $ERROR('#9: parseFloat("0x9") === 0. Actual: ' + (parseFloat("0x9")));
}

//CHECK#A
if (parseFloat("0xA") !== 0) {
  $ERROR('#A: parseFloat("0xA") === 0. Actual: ' + (parseFloat("0xA")));
}

//CHECK#B
if (parseFloat("0xB") !== 0) {
  $ERROR('#B: parseFloat("0xB") === 0. Actual: ' + (parseFloat("0xB")));
}

//CHECK#C
if (parseFloat("0xC") !== 0) {
  $ERROR('#C: parseFloat("0xC") === 0. Actual: ' + (parseFloat("0xC")));
}

//CHECK#D
if (parseFloat("0xD") !== 0) {
  $ERROR('#D: parseFloat("0xD") === 0. Actual: ' + (parseFloat("0xD")));
}

//CHECK#E
if (parseFloat("0xE") !== 0) {
  $ERROR('#E: parseFloat("0xE") === 0. Actual: ' + (parseFloat("0xE")));
}

//CHECK#F
if (parseFloat("0xF") !== 0) {
  $ERROR('#F: parseFloat("0xF") === 0. Actual: ' + (parseFloat("0xF")));
}

