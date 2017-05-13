// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object function is called with one argument value,
 * and the value neither is null nor undefined, and is supplied, return ToObject(value)
 *
 * @path ch15/15.2/15.2.1/S15.2.1.1_A2_T6.js
 * @description Calling Object function with Infinity argument value
 */

var num = Infinity;

// CHECK#1
if(typeof num  !== 'number'){
  $ERROR('#1: num = Infinity should be a Number primitive');
}

var obj = Object(num);

//CHECK#2
if (obj.constructor !== Number) {
  $ERROR('#2: Object(Infinity) returns ToObject(Infinity)');
}

//CHECK#3
if (typeof obj!=="object") {
  $ERROR('#3: Object(Infinity) returns ToObject(Infinity)');
}

//CHECK#4
if ((obj != Infinity)||(obj === Infinity)) {
  $ERROR('#4: Object(Infinity) returns ToObject(Infinity)');
}


