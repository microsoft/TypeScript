// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x-- returns ToNumber(x)
 *
 * @path ch11/11.3/11.3.2/S11.3.2_A4_T2.js
 * @description Type(x) is number primitive or Number object
 */

//CHECK#1
var x = 1.1;
var y = x--;
if (y !== 1.1) {
  $ERROR('#1: var x = 1.1; var y = x--; y === 1.1. Actual: ' + (y));
}

//CHECK#2
var x = new Number(-0.1);
var y = x--;
if (y !== -0.1) {
  $ERROR('#2: var x = new Number(-0.1); var y = x--; y === -0.1. Actual: ' + (y));
}

