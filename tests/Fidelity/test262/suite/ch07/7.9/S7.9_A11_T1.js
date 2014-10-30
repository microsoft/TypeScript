// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check If Statement for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A11_T1.js
 * @description Use if (false) x = 1 (without semicolon) and check x
 */

//CHECK#1
var x = 0;
if (false) x = 1
if (x !== 0) {
  $ERROR('#1: Check If Statement for automatic semicolon insertion');
}

