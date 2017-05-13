// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x-- returns ToNumber(x)
 *
 * @path ch11/11.3/11.3.2/S11.3.2_A4_T1.js
 * @description Type(x) is boolean primitive or Boolean object
 */

//CHECK#1
var x = true;
var y = x--; 
if (y !== 1) {
  $ERROR('#1: var x = true; var y = x--; y === 1. Actual: ' + (y));
}

//CHECK#2
var x = new Boolean(false);
var y = x--;
if (y !== 0) {
  $ERROR('#2: var x = new Boolean(false); var y = x--; y === 0. Actual: ' + (y));
}

