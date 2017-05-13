// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object constructor is called with one argument value and
 * the type of value is String, return ToObject(string)
 *
 * @path ch15/15.2/15.2.2/S15.2.2.1_A3_T2.js
 * @description Argument value is an empty string
 */

var str = '';

//CHECK#1
if (typeof str  !== 'string') {
  $FAIL('#1: "" is NOT a String');
}

var n_obj = new Object(str);

//CHECK#2
if (n_obj.constructor !== String) {
  $ERROR('#2: When the Object constructor is called with String argument return ToObject(string)');
}

//CHECK#3
if (typeof n_obj !== 'object') {
  $ERROR('#3: When the Object constructor is called with String argument return ToObject(string)');
}

//CHECK#4
if ( n_obj != str) {
  $ERROR('#4: When the Object constructor is called with String argument return ToObject(string)');
}

//CHECK#5
if ( n_obj === str) {
  $ERROR('#5: When the Object constructor is called with String argument return ToObject(string)');
}

