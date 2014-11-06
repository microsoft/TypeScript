// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of
 * the Array prototype object is the Object prototype object
 *
 * @path ch15/15.4/15.4.4/S15.4.4_A1.1_T1.js
 * @description Create new property of Function.prototype. When Array.prototype object has this property
 */

Object.prototype.myproperty = 1;

//CHECK#1
if (Array.prototype.myproperty !== 1) {
  $ERROR('#1: Object.prototype.myproperty = 1; Array.prototype.myproperty === 1. Actual: ' + (Array.prototype.myproperty));
}

//CHECK#2
if (Array.prototype.hasOwnProperty('myproperty') !== false) {
  $ERROR('#2: Object.prototype.myproperty = 1; Array.prototype.hasOwnProperty(\'myproperty\') === false. Actual: ' + (Array.prototype.hasOwnProperty('myproperty')));
}

