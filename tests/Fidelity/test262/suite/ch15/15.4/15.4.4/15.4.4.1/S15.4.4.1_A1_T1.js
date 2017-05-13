// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of Array.prototype.constructor is
 * the built-in Array constructor
 *
 * @path ch15/15.4/15.4.4/15.4.4.1/S15.4.4.1_A1_T1.js
 * @description Array.prototype.constructor === Array
 */

//CHECK#1
if (Array.prototype.constructor !== Array) {
  $ERROR('#1: Array.prototype.constructor === Array. Actual: ' + (Array.prototype.constructor));
}   

