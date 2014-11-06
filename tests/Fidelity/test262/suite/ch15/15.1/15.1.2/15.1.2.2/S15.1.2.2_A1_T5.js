// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A1_T5.js
 * @description Checking for Number object
 */

//CHECK#1
if (parseInt(new Number(-1)) !== parseInt("-1")) {
  $ERROR('#1: parseInt(new Number(-1)) === parseInt("-1"). Actual: ' + (parseInt(new Number(-1))));
}

//CHECK#2
if (String(parseInt(new Number(Infinity))) !== "NaN") {
  $ERROR('#2: String(parseInt(new Number(Infinity))) === "NaN". Actual: ' + (String(parseInt(new Number(Infinity)))));
}

//CHECK#3
if (String(parseInt(new Number(NaN))) !== "NaN") {
  $ERROR('#3: String(parseInt(new Number(NaN))) === "NaN". Actual: ' + (String(parseInt(new Number(NaN)))));
}

