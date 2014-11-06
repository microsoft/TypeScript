// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object constructor is called with one argument value and
 * the type of value is Number, return ToObject(number)
 *
 * @path ch15/15.2/15.2.2/S15.2.2.1_A5_T2.js
 * @description Argument value is NaN
 */

var num = NaN;

//CHECK#1
if (typeof num  !== 'number') {
  $FAIL('#1: NaN is NOT a number');
}

var n_obj = new Object(num);

//CHECK#2
if (n_obj.constructor !== Number) {
  $ERROR('#2: When the Object constructor is called with Number argument return ToObject(number)');
}

//CHECK#3
if (typeof n_obj !== 'object') {
  $ERROR('#3: When the Object constructor is called with Number argument return ToObject(number)');
}

