// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator ++x returns ToNumber(x) + 1
 *
 * @path ch11/11.4/11.4.4/S11.4.4_A4_T2.js
 * @description Type(x) is number primitive or Number object
 */

//CHECK#1
var x = 0.1;
if (++x !== 0.1 + 1) {
  $ERROR('#1: var x = 0.1; ++x === 0.1 + 1. Actual: ' + (++x));
}

//CHECK#2
var x = new Number(-1.1);
if (++x !== -1.1 + 1) {
  $ERROR('#2: var x = new Number(-1.1); ++x === -1.1 + 1. Actual: ' + (++x));
}

