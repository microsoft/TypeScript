// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A1_T6.js
 * @description Checking for String object
 */

//CHECK#1
if (parseFloat(new String("-1.1")) !== parseFloat("-1.1")) {
  $ERROR('#1: parseFloat(new String("-1.1")) === parseFloat("-1.1"). Actual: ' + (parseFloat(new String("-1.1"))));
}

//CHECK#2
if (parseFloat(new String("Infinity")) !== parseFloat("Infinity")) {
  $ERROR('#2: parseFloat(new String("Infinity")) === parseFloat("Infinity"). Actual: ' + (parseFloat(new String("Infinity"))));
}

//CHECK#3
if (String(parseFloat(new String("NaN"))) !== "NaN") {
  $ERROR('#3: String(parseFloat(new String("NaN"))) === "NaN". Actual: ' + (String(parseFloat(new String("NaN")))));
}

//CHECK#4
if (parseFloat(new String(".01e+2")) !== parseFloat(".01e+2")) {
  $ERROR('#4: parseFloat(new String(".01e+2")) === parseFloat(".01e+2"). Actual: ' + (parseFloat(new String(".01e+2"))));
}

//CHECK#5
if (String(parseFloat(new String("false"))) !== "NaN") {
  $ERROR('#5: String(parseFloat(new String("false"))) === "NaN". Actual: ' + (String(parseFloat(new String("false")))));
}

