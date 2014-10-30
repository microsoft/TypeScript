// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.5/11.5.3/S11.5.3_A2.4_T1.js
 * @description Checking with "="
 */

//CHECK#1
var x = 0; 
if ((x = 1) % x !== 0) {
  $ERROR('#1: var x = 0; (x = 1) % x === 0. Actual: ' + ((x = 1) % x));
}

//CHECK#2
var x = 1; 
if (x % (x = 2) !== 1) {
  $ERROR('#2: var x = 1; x % (x = 2) === 1. Actual: ' + (x % (x = 2)));
}


