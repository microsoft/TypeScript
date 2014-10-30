// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the Function prototype object is the Object prototype object (15.3.4)
 *
 * @path ch15/15.3/15.3.4/S15.3.4_A3_T1.js
 * @description Checking prototype of Function.prototype
 */

if (Object.getPrototypeOf(Function.prototype) !== Object.prototype) {
  $ERROR('#1: The value of the internal [[Prototype]] property of ' +
         'the Function prototype object is the Object prototype ' +
         'object (15.3.4)');
}

