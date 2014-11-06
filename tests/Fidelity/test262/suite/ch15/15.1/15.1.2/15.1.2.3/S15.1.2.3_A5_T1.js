// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Return the number value for the MV of Result(4)
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A5_T1.js
 * @description Checking Infinity
 */

//CHECK#1
if (parseFloat("Infinity") !== Number.POSITIVE_INFINITY) {
  $ERROR('#1: parseFloat("Infinity") === Number.POSITIVE_INFINITY. Actual: ' + (parseFloat("Infinity")));
}

//CHECK#2
if (parseFloat("+Infinity") !== Number.POSITIVE_INFINITY) {
  $ERROR('#2: parseFloat("+Infinity") === Number.POSITIVE_INFINITY. Actual: ' + (parseFloat("+Infinity")));
}

//CHECK#3
if (parseFloat("-Infinity") !== Number.NEGATIVE_INFINITY) {
  $ERROR('#3: parseFloat("-Infinity") === Number.NEGATIVE_INFINITY. Actual: ' + (parseFloat("-Infinity")));
}

