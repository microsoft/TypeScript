// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check For Statement for automatic semicolon insertion
 *
 * @path ch07/7.9/S7.9_A6.1_T6.js
 * @description for(false semicolon false semicolon false \n)
 */

//CHECK#1
for(false;false;false
) {
  break;
}

