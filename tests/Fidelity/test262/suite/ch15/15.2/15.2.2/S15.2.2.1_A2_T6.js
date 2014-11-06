// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object constructor is called with one argument value and
 * the value is a native ECMAScript object, do not create a new object but simply return value
 *
 * @path ch15/15.2/15.2.2/S15.2.2.1_A2_T6.js
 * @description The value is a declared function
 */

var n_obj = new Object(func);

//CHECK#1
if (n_obj !== func) {
  $ERROR('#1: When the Object constructor is called and if the value is an Object simply value returns');
}

//CHECK#2
if (n_obj() !== 1) {
  $ERROR('When the Object constructor is called and if the value is an Object simply value returns');
}

function func(){return 1;};

