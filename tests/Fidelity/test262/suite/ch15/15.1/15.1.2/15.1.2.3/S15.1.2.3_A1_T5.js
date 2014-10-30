// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A1_T5.js
 * @description Checking for Number object
 */

//CHECK#1
if (parseFloat(new Number(-1.1)) !== parseFloat("-1.1")) {
  $ERROR('#1: parseFloat(new Number(-1.1)) === parseFloat("-1.1"). Actual: ' + (parseFloat(new Number(-1.1))));
}

//CHECK#2
if (parseFloat(new Number(Infinity)) !== parseFloat("Infinity")) {
  $ERROR('#2: parseFloat(new Number(Infinity)) === parseFloat("Infinity"). Actual: ' + (parseFloat(new Number(Infinity))));
}

//CHECK#3
if (String(parseFloat(new Number(NaN))) !== "NaN") {
  $ERROR('#3: String(parseFloat(new Number(NaN))) === "NaN". Actual: ' + (String(parseFloat(new Number(NaN)))));
}

//CHECK#4
if (parseFloat(new Number(.01e+2)) !== parseFloat(".01e+2")) {
  $ERROR('#4: parseFloat(new Number(.01e+2)) === parseFloat(".01e+2"). Actual: ' + (parseFloat(new Number(.01e+2))));
}

