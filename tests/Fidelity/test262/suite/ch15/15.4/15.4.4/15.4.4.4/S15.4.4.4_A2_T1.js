// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The concat function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.4/S15.4.4.4_A2_T1.js
 * @description Checking this for Object object, items are objects and primitives
 */

var x = {};
x.concat = Array.prototype.concat;
var y = new Object();
var z = new Array(1,2);
var arr = x.concat(y,z, -1, true, "NaN");

//CHECK#0
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#0: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#1
if (arr[0] !== x) {
  $ERROR('#1: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[0] === x. Actual: ' + (arr[0]));
}

//CHECK#2
if (arr[1] !== y) {
  $ERROR('#2: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[1] === y. Actual: ' + (arr[1]));
}

//CHECK#3
if (arr[2] !== 1) {
  $ERROR('#3: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[2] === 1. Actual: ' + (arr[2]));
}

//CHECK#4
if (arr[3] !== 2) {
  $ERROR('#4: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[3] === 2. Actual: ' + (arr[3]));
}

//CHECK#5
if (arr[4] !== -1) {
  $ERROR('#5: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[4] === -1. Actual: ' + (arr[4]));
}

//CHECK#6
if (arr[5] !== true) {
  $ERROR('#6: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[5] === true. Actual: ' + (arr[5]));
}

//CHECK#7
if (arr[6] !== "NaN") {
  $ERROR('#7: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr[6] === "NaN". Actual: ' + (arr[6]));
}

//CHECK#8
if (arr.length !== 7) {
  $ERROR('#8: var x = {}; x.concat = Array.prototype.concat; var y = new Object(); var z = new Array(1,2); var arr = x.concat(y,z, -1, true, "NaN"); arr.length === 7. Actual: ' + (arr.length));
}                

