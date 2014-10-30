// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A1_T2.js
 * @description Checking for number primitive
 */

//CHECK#1
if (parseInt(-1) !== parseInt("-1")) {
  $ERROR('#1: parseInt(-1) === parseInt("-1"). Actual: ' + (parseInt(-1)));
}

//CHECK#2
if (String(parseInt(Infinity)) !== "NaN") {
  $ERROR('#2: String(parseInt(Infinity)) === "NaN". Actual: ' + (String(parseInt(Infinity))));
}

//CHECK#3
if (String(parseInt(NaN)) !== "NaN") {
  $ERROR('#3: String(parseInt(NaN)) === "NaN". Actual: ' + (String(parseInt(NaN))));
}

//CHECK#4
if (parseInt(-0) !== 0) {
  $ERROR('#4: parseInt(-0) === 0. Actual: ' + (parseInt(-0)));
} else {
  if (1 / parseInt(-0) !== Number.POSITIVE_INFINITY) {
    $ERROR('#4: parseInt(-0) === +0. Actual: ' + (parseInt(-0)));
  }
}    

