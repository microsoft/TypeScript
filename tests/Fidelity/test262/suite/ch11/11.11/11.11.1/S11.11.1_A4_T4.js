// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return y
 *
 * @path ch11/11.11/11.11.1/S11.11.1_A4_T4.js
 * @description Type(x) or Type(y) is changed between null and undefined
 */

//CHECK#1
if ((true && undefined) !== undefined) {
  $ERROR('#1: (true && undefined) === undefined');
}

//CHECK#2
if ((true && null) !== null) {
  $ERROR('#2: (true && null) === null');
}

