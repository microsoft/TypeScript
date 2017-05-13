// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of
 * the Array prototype object is the Object prototype object
 *
 * @path ch15/15.4/15.4.4/S15.4.4_A1.1_T3.js
 * @description Checking use isPrototypeOf
 */

//CHECK#1
if (Object.prototype.isPrototypeOf(Array.prototype) !== true) {
  $ERROR('#1: Object.prototype.isPrototypeOf(Array.prototype) === true. Actual: ' + (Object.prototype.isPrototypeOf(Array.prototype)));
}

