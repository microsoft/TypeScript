// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object constructor is called with one argument value and
 * the value is a native ECMAScript object, do not create a new object but simply return value
 *
 * @path ch15/15.2/15.2.2/S15.2.2.1_A2_T3.js
 * @description The value is an array
 */

var arr = [1,2,3];

var n_obj = new Object(arr);

arr.push(4);

//CHECK#1
if (n_obj !== arr) {
  $ERROR('#1: When the Object constructor is called and if the value is an Object simply value returns.');
}

//CHECK#2
if (n_obj[3] !== 4) {
  $ERROR('#2: When the Object constructor is called and if the value is an Object simply value returns.');
}

