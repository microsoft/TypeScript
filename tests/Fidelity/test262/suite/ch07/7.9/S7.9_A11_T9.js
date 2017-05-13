// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check If Statement for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A11_T9.js
 * @description Use if (false) {x = 1} \n else x=-1 and check x
 */

//CHECK#1
var x = 0;
if (false) {x = 1}
else x = -1
if (x !== -1) {
  $ERROR('#1: Check If Statement for automatic semicolon insertion');
}

