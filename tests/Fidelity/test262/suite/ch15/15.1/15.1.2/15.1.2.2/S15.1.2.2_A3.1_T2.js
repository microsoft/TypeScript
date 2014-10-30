// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToNumber
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A3.1_T2.js
 * @description Checking for string primitive
 */

//CHECK#1
if (parseInt("11", "2") !== parseInt("11", 2)) {
  $ERROR('#1: parseInt("11", "2") === parseInt("11", 2). Actual: ' + (parseInt("11", "2")));
}

//CHECK#2
if (parseInt("11", "0") !== parseInt("11", 10)) {
  $ERROR('#2: parseInt("11", "0") === parseInt("11", 10). Actual: ' + (parseInt("11", "0")));
}

//CHECK#3
if (parseInt("11", "") !== parseInt("11", 10)) {
  $ERROR('#3: parseInt("11", "") === parseInt("11", 10). Actual: ' + (parseInt("11", "")));
}


