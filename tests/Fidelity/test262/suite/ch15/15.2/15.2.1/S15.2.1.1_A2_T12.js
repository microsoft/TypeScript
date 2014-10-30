// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object function is called with one argument value,
 * and the value neither is null nor undefined, and is supplied, return ToObject(value)
 *
 * @path ch15/15.2/15.2.1/S15.2.1.1_A2_T12.js
 * @description Calling Object function with numeric expression as argument value
 */

var obj = Object(1.1*([].length+{q:1}["q"]));

//CHECK#2
if (typeof obj !== "object") {
  $ERROR('#2: Object(expression) returns ToObject(expression)');
}

//CHECK#3
if (obj.constructor !== Number) {
  $ERROR('#3: Object(expression) returns ToObject(expression)');
}

//CHECK#4
if ((obj != 1.1)||(obj === 1.1)) {
  $ERROR('#4: Object(expression) returns ToObject(expression)');
}
//

