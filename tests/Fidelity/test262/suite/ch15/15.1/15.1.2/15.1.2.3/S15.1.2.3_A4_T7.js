// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Compute the longest prefix of Result(2), which might be Result(2) itself,
 * which satisfies the syntax of a StrDecimalLiteral
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A4_T7.js
 * @description Checking DecimalDigits ExponentPart_opt
 */

//CHECK#1
if (parseFloat("-11string") !== -11) {
  $ERROR('#1: parseFloat("-11string") === -11. Actual: ' + (parseFloat("-11string")));
}

//CHECK#2
if (parseFloat("01string") !== 1) {
  $ERROR('#2: parseFloat("01string") === 1. Actual: ' + (parseFloat("01string")));
}

//CHECK#3
if (parseFloat("-11e-1string") !== -1.1) {
  $ERROR('#3: parseFloat("-11e-1string") === -1.1. Actual: ' + (parseFloat("-11e-1string")));
}

//CHECK#4
if (parseFloat("01e1string") !== 10) {
  $ERROR('#4: parseFloat("01e1string") === 10. Actual: ' + (parseFloat("01e1string")));
}

//CHECK#5
if (parseFloat("001string") !== 1) {
  $ERROR('#5: parseFloat("001string") === 1. Actual: ' + (parseFloat("001string")));
}

//CHECK#6
if (parseFloat("1e001string") !== 10) {
  $ERROR('#6: parseFloat("1e001string") === 10. Actual: ' + (parseFloat("1e001string")));
}

//CHECK#7
if (parseFloat("010string") !== 10) {
  $ERROR('#7: parseFloat("010string") === 10. Actual: ' + (parseFloat("010string")));
}

