// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the concat method is called with zero or more arguments item1, item2,
 * etc., it returns an array containing the array elements of the object followed by
 * the array elements of each argument in order
 *
 * @path ch15/15.4/15.4.4/15.4.4.4/S15.4.4.4_A1_T1.js
 * @description Checking this algorithm, items are Array object
 */

var x = new Array();
var y = new Array(0,1);
var z = new Array(2,3,4);
var arr = x.concat(y,z);

//CHECK#0
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#0: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#1
if (arr[0] !== 0) {
  $ERROR('#1: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr[0] === 0. Actual: ' + (arr[0]));
}

//CHECK#2
if (arr[1] !== 1) {
  $ERROR('#2: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr[1] === 1. Actual: ' + (arr[1]));
}

//CHECK#3
if (arr[2] !== 2) {
  $ERROR('#3: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr[2] === 2. Actual: ' + (arr[2]));
}

//CHECK#4
if (arr[3] !== 3) {
  $ERROR('#4: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr[3] === 3. Actual: ' + (arr[3]));
}

//CHECK#5
if (arr[4] !== 4) {
  $ERROR('#5: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr[4] === 4. Actual: ' + (arr[4]));
}

//CHECK#6
if (arr.length !== 5) {
  $ERROR('#6: var x = new Array(); var y = new Array(0,1); var z = new Array(2,3,4); var arr = x.concat(y,z); arr.length === 5. Actual: ' + (arr.length));
}                

