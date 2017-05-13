// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from undefined value is NaN
 *
 * @path ch09/9.3/S9.3_A1_T1.js
 * @description Undefined convert to Number by explicit transformation
 */

// CHECK#1
if (isNaN(Number(undefined)) !== true) {
  $ERROR('#1: Number(undefined) === Not-a-Number. Actual: ' + (Number(undefined)));
}

// CHECK#2
if (isNaN(Number(void 0)) !== true) {
  $ERROR('#2: Number(void 0) === Not-a-Number. Actual: ' + (Number(void 0)));
}

// CHECK#3
if (isNaN(Number(eval("var x"))) !== true) {
  $ERROR('#3: Number(eval("var x")) === Not-a-Number. Actual: ' + (Number(eval("var x"))));
}

