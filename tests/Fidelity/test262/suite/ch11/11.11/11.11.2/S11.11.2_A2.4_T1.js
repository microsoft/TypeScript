// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * First expression is evaluated first, and then second expression
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A2.4_T1.js
 * @description Checking with "="
 */

//CHECK#1
var x = true; 
if (((x = false) || x) !== false) {
  $ERROR('#1: var x = true; ((x = false) || x) === false');
}

//CHECK#2
var x = true; 
if ((x || (x = false)) !== true) {
  $ERROR('#2: var x = true; (x || (x = false)) === true');
}

