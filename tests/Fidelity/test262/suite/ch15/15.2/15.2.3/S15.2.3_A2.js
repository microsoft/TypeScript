// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the Object constructor
 * is the Function prototype object
 *
 * @path ch15/15.2/15.2.3/S15.2.3_A2.js
 * @description Checking Function.prototype.isPrototypeOf(Object)
 */

// CHECK#
if (!(Function.prototype.isPrototypeOf(Object))) {
  $ERROR('#1: the value of the internal [[Prototype]] property of the Object constructor is the Function prototype object.');
}

