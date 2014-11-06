// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from undefined value is NaN
 *
 * @path ch09/9.3/S9.3_A1_T2.js
 * @description Undefined convert to Number by implicit transformation
 */

// CHECK#1
if (isNaN(+(undefined)) !== true) {
  $ERROR('#1: +(undefined) === Not-a-Number. Actual: ' + (+(undefined)));
}

// CHECK#2
if (isNaN(+(void 0)) !== true) {
  $ERROR('#2: +(void 0) === Not-a-Number. Actual: ' + (+(void 0)));
}

// CHECK#3
if (isNaN(+(eval("var x"))) !== true) {
  $ERROR('#3: +(eval("var x")) === Not-a-Number. Actual: ' + (+(eval("var x"))));
}

