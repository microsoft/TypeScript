// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the Object function is called with one argument value,
 * and the value neither is null nor undefined, and is supplied, return ToObject(value)
 *
 * @path ch15/15.2/15.2.1/S15.2.1.1_A2_T2.js
 * @description Calling Object function with number argument value
 */

var num = 1.1;

// CHECK#1
if(typeof num  !== 'number'){
  $ERROR('#1: num = 1.1 should be Number primitive');
}

var obj = Object(num);

//CHECK#2
if (typeof obj !== "object") {
  $ERROR('#2: Object(1.1) returns ToObject(1.1)');
}

//CHECK#3
if (obj.constructor !== Number) {
  $ERROR('#3: Object(1.1) returns ToObject(1.1)');
}

//CHECK#4
if ((obj != 1.1)||(obj === 1.1)) {
  $ERROR('#4: Object(1.1) returns ToObject(1.1)');
}
//

