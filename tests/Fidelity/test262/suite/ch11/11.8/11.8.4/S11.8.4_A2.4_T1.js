// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.8/11.8.4/S11.8.4_A2.4_T1.js
 * @description Checking with "="
 */

//CHECK#1
var x = 1; 
if ((x = 0) >= x !== true) {
  $ERROR('#1: var x = 1; (x = 0) >= x === true');
}

//CHECK#2
var x = 0; 
if (x >= (x = 1) !== false) {
  $ERROR('#2: var x = 0; x >= (x = 1) === false');
}


