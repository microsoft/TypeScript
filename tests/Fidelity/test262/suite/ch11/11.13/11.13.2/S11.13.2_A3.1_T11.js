// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x @= y uses PutValue(x, x @ y)
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A3.1_T11.js
 * @description Checking Expression and Variable statements for x |= y
 */

//CHECK#1
var x = 0;
x |= 1; 
if (x !== 1) {
  $ERROR('#1: var x = 0; x |= 1; x === 1. Actual: ' + (x));
}

//CHECK#2
y = 1;
y |= 0;
if (y !== 1) {
  $ERROR('#2: y = 1; y |= 0; y === 1. Actual: ' + (y));
}

