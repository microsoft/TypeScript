// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check If Statement for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A11_T4.js
 * @description Checking if execution of "if (false) x = 1 else x = -1" fails
 * @negative
 */

//CHECK#1
var x = 0;
if (false) x = 1 else x = -1

