// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object constructor is called with one argument value and
 * the type of value is Number, return ToObject(number)
 *
 * @path ch15/15.2/15.2.2/S15.2.2.1_A5_T4.js
 * @description Argument value is numeric expression
 */

var n_obj = new Object( 2*([].length + {q:1}["q"]));

//CHECK#2
if (n_obj.constructor !== Number) {
  $ERROR('#2: When the Object constructor is called with Number argument return ToObject(number)');
}

//CHECK#3
if (typeof n_obj !== 'object') {
  $ERROR('#3: When the Object constructor is called with Number argument return ToObject(number)');
}

//CHECK#4
if ( n_obj != 2) {
  $ERROR('#4: When the Object constructor is called with Number argument return ToObject(number)');
}

//CHECK#5
if ( n_obj === 2) {
  $ERROR('#5: When the Object constructor is called with Number argument return ToObject(number)');
}

