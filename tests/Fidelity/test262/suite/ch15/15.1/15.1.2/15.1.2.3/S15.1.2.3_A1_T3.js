// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToString
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A1_T3.js
 * @description Checking for undefined and null
 */

//CHECK#1
if (!(isNaN(parseFloat(undefined)) && isNaN(parseFloat("NaN")))) {
  $ERROR('#1: parseFloat(undefined) === Not-a-Number; parseFloat("NaN") === Not-a-Number. Actual: ' + (parseFloat("NaN")));
}

//CHECK#2
if (!(isNaN(parseFloat(null)) && isNaN(parseFloat("NaN")))) {
  $ERROR('#2: parseFloat(null) === Not-a-Number; parseFloat("NaN") === Not-a-Number. Actual: ' + (parseFloat("NaN")));
}


//CHECK#3
if (String(parseFloat(undefined)) !== "NaN") {
  $ERROR('#3: String(parseFloat(undefined)) === "NaN". Actual: ' + (String(parseFloat(undefined))));
}

//CHECK#4
if (String(parseFloat(null)) !== "NaN") {
  $ERROR('#4: String(parseFloat(null)) === "NaN". Actual: ' + (String(parseFloat(null))));
}

