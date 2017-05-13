// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check ToUint32(length) for non Array objects
 *
 * @path ch15/15.4/15.4.4/15.4.4.13/S15.4.4.13_A3_T1.js
 * @description length = 4294967296
 */

var obj = {};
obj.unshift = Array.prototype.unshift;
obj.length = 4294967296;

//CHECK#1
var unshift = obj.unshift("x", "y", "z");
if (unshift !== 3) {
  $ERROR('#1: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift("x", "y", "z") === 3. Actual: ' + (unshift));
}

//CHECK#2
if (obj.length !== 3) {
  $ERROR('#2: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift("x", "y", "z"); obj.length === 3. Actual: ' + (obj.length));
}

//CHECK#3
if (obj[0] !== "x") {
   $ERROR('#3: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift("x", "y", "z"); obj[0] === "x". Actual: ' + (obj[0]));
}

//CHECK#4
if (obj[1] !== "y") {
   $ERROR('#4: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift("x", "y", "z"); obj[1] === "y". Actual: ' + (obj[1]));
}  

//CHECK#5
if (obj[2] !== "z") {
   $ERROR('#5: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift("x", "y", "z"); obj[2] === "z". Actual: ' + (obj[2]));
} 

var obj = {};
obj.unshift = Array.prototype.unshift;
obj.length = 4294967296;

//CHECK#6
var unshift = obj.unshift();
if (unshift !== 0) {
  $ERROR('#6: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift() === 0. Actual: ' + (unshift));
}

//CHECK#7
if (obj.length !== 0) {
  $ERROR('#7: var obj = {}; obj.unshift = Array.prototype.unshift; obj.length = 4294967296; obj.unshift(); obj.length === 0. Actual: ' + (obj.length));
} 

