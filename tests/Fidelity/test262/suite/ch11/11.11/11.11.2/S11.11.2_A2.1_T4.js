// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x || y uses GetValue
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A2.1_T4.js
 * @description If ToBoolean(x) is true and GetBase(y) is null, return true
 */

//CHECK#1
if ((true || x) !== true) {
  $ERROR('#1: (true || x) === true');
}

