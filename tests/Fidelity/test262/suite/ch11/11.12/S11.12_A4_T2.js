// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return y
 *
 * @path ch11/11.12/S11.12_A4_T2.js
 * @description Type(y) and Type(z) are number primitives
 */

//CHECK#1
if ((1 ? 0 : 1) !== 0) {
  $ERROR('#1: (1 ? 0 : 1) === 0');
}

//CHECK#2
var y = new Number(1);
if ((1 ? y : 0) !== y) {
  $ERROR('#2: (var y = new Number(1); (1 ? y : 0) === y');
}

//CHECK#3
var y = new Number(NaN);
if ((y ? y : 1) !== y) {
  $ERROR('#3: (var y = new Number(NaN); (y ? y : 1) === y');
}

