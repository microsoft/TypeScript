// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the toString method is 0
 *
 * @path ch15/15.3/15.3.4/15.3.4.2/S15.3.4.2_A11.js
 * @description Checking Function.prototype.toString.length
 */

//CHECK#1
if (!(Function.prototype.toString.hasOwnProperty("length"))) {
  $ERROR('#1: The Function.prototype.toString has the length property');
}

//CHECK#2
if (Function.prototype.toString.length !== 0) {
  $ERROR('#2: The length property of the toString method is 0');
}

