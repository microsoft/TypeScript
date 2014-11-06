// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.8/11.8.2/S11.8.2_A2.4_T1.js
 * @description Checking with "="
 */

//CHECK#1
var x = 0; 
if ((x = 1) > x !== false) {
  $ERROR('#1: var x = 0; (x = 1) > x === false');
}

//CHECK#2
var x = 1; 
if (x > (x = 0) !== true) {
  $ERROR('#2: var x = 1; x > (x = 0) === true');
}


