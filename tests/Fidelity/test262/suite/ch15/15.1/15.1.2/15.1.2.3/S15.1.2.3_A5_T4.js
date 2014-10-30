// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Return the number value for the MV of Result(4)
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A5_T4.js
 * @description Checking DecimalDigits ExponentPart_opt
 */

//CHECK#1
if (parseFloat("-11") !== -11) {
  $ERROR('#1: parseFloat("-11") === -11. Actual: ' + (parseFloat("-11")));
}

//CHECK#2
if (parseFloat("01") !== 1) {
  $ERROR('#2: parseFloat("01") === 1. Actual: ' + (parseFloat("01")));
}

//CHECK#3
if (parseFloat("-11e-1") !== -1.1) {
  $ERROR('#3: parseFloat("-11e-1") === -1.1. Actual: ' + (parseFloat("-11e-1")));
}

//CHECK#4
if (parseFloat("01e1") !== 10) {
  $ERROR('#4: parseFloat("01e1") === 10. Actual: ' + (parseFloat("01e1")));
}

//CHECK#5
if (parseFloat("001") !== 1) {
  $ERROR('#5: parseFloat("001") === 1. Actual: ' + (parseFloat("001")));
}

//CHECK#6
if (parseFloat("1e001") !== 10) {
  $ERROR('#6: parseFloat("1e001") === 10. Actual: ' + (parseFloat("1e001")));
}

//CHECK#7
if (parseFloat("010") !== 10) {
  $ERROR('#7: parseFloat("010") === 10. Actual: ' + (parseFloat("010")));
}

