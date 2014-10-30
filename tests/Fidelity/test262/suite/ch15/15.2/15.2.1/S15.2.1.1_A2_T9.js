// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object function is called with one argument value,
 * and the value neither is null nor undefined, and is supplied, return ToObject(value)
 *
 * @path ch15/15.2/15.2.1/S15.2.1.1_A2_T9.js
 * @description Calling Object function with function argument value. The function is declared
 */

//CHECK#1
if (typeof func !== 'function') {
  $ERROR('#1: func = function(){return 1;} is NOT an function');
}

var n_obj = Object(func);

//CHECK#2
if ((n_obj !== func)||(n_obj()!==1)) {
  $ERROR('#2: Object(function) returns function');
}

function func(){return 1;};


