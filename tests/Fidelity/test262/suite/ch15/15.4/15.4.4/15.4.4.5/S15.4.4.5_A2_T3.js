// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The join function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A2_T3.js
 * @description If ToUint32(length) is zero, return the empty string
 */

var obj = {};
obj.join = Array.prototype.join;

//CHECK#1
obj.length = 4.5;
if (obj.join() !== ",,,") {
  $ERROR('#1: var obj = {}; obj.length = 4.5; obj.join = Array.prototype.join; obj.join() === ",,,". Actual: ' + (obj.join()));
}

//CHECK#2
obj[0] = undefined;
obj[1] = 1;
obj[2] = null;
if (obj.join() !== ",1,,") {
  $ERROR('#1: var obj = {}; obj.length = 4.5; obj[0] = undefined; obj[1] = 1; obj[2] = null; obj.join = Array.prototype.join; obj.join() === ",1,,". Actual: ' + (obj.join()));
}

//CHECK#3
if (obj.length !== 4.5) {
  $ERROR('#1: var obj = {}; obj.length = 4.5; obj[0] = undefined; obj[1] = 1; obj[2] = null; obj.join = Array.prototype.join; obj.join(); obj.length === 4.5. Actual: ' + (obj.length));
}  

var obj = {};
obj.join = Array.prototype.join;

//CHECK#4
var x = new Number(4.5);
obj.length = x;
if (obj.join() !== ",,,") {
  $ERROR('#4: var obj = {}; var x = new Number(4.5); obj.length = x; obj.join = Array.prototype.join; obj.join() === ",,,". Actual: ' + (obj.join()));
}

//CHECK#5
obj[0] = undefined;
obj[1] = 1;
obj[2] = null;
if (obj.join() !== ",1,,") {
  $ERROR('#5: var obj = {}; var x = new Number(4.5); obj.length = x; obj[0] = undefined; obj[1] = 1; obj[2] = null; obj.join = Array.prototype.join; obj.join() === ",1,,". Actual: ' + (obj.join()));
}

//CHECK#6
if (obj.length !== x) {
  $ERROR('#6: var obj = {}; var x = new Number(4.5); obj.length = x; obj[0] = undefined; obj[1] = 1; obj[2] = null; obj.join = Array.prototype.join; obj.join(); obj.length === x. Actual: ' + (obj.length));
}  

