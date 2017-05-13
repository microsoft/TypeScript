// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A1_T3.js
 * @description Checking for undefined and null
 */

//CHECK#1
if (!(isNaN(parseInt(undefined)) && isNaN(parseInt("NaN")))) {
  $ERROR('#1: parseInt(undefined) === Not-a-Number; parseInt("NaN") === Not-a-Number. Actual: ' + (parseInt("NaN")));
}

//CHECK#2
if (!(isNaN(parseInt(null)) && isNaN(parseInt("NaN")))) {
  $ERROR('#2: parseInt(null) === Not-a-Number; parseInt("NaN") === Not-a-Number. Actual: ' + (parseInt("NaN")));
}

//CHECK#3
if (String(parseInt(undefined)) !== "NaN") {
  $ERROR('#3: String(parseInt(undefined)) === "NaN". Actual: ' + (String(parseInt(undefined))));
}

//CHECK#4
if (String(parseInt(null)) !== "NaN") {
  $ERROR('#4: String(parseInt(null)) === "NaN". Actual: ' + (String(parseInt(null))));
}

