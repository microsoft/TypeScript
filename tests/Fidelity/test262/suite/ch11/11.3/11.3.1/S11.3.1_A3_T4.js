// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x++ returns x = ToNumber(x) + 1
 *
 * @path ch11/11.3/11.3.1/S11.3.1_A3_T4.js
 * @description Type(x) is undefined or null
 */

//CHECK#1
var x; 
x++; 
if (isNaN(x) !== true) {
  $ERROR('#1: var x; x++; x === Not-a-Number. Actual: ' + (x));
}

//CHECK#2
var x = null; 
x++; 
if (x !== 1) {
  $ERROR('#2: var x = null; x++; x === 1. Actual: ' + (x));
}

