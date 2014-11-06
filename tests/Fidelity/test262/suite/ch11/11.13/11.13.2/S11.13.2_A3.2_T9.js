// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x @= y returns x @ y
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A3.2_T9.js
 * @description Checking Expression and Variable statements for x &= y
 */

//CHECK#1
var x = 1;
var x1 = (x &= 1);
if (x1 !== 1) {
  $ERROR('#1: var x = 1; var x1 = (x &= 1); x1 === 1. Actual: ' + (x1));
}

//CHECK#2
y = 1;
y1 = (y &= 1);
if (y1 !== 1) {
  $ERROR('#2: y = 1; y1 = (y &= 1); y1 === 1. Actual: ' + (y1));
}

