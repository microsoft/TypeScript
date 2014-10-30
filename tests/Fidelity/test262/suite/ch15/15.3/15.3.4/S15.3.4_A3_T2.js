// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the Function prototype object is the Object prototype object (15.3.2.1)
 *
 * @path ch15/15.3/15.3.4/S15.3.4_A3_T2.js
 * @description Add new property to Object.prototype and check it at Function.prototype
 */

Object.prototype.indicator = 1;

//CHECK#1
if (Function.prototype.indicator!==1) {
  $ERROR('#1: The value of the internal [[Prototype]] property of the Function prototype object is the Object prototype object (15.3.2.1)');
}

