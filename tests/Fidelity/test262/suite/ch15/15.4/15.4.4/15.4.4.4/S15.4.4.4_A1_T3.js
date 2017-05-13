// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the concat method is called with zero or more arguments item1, item2,
 * etc., it returns an array containing the array elements of the object followed by
 * the array elements of each argument in order
 *
 * @path ch15/15.4/15.4.4/15.4.4.4/S15.4.4.4_A1_T3.js
 * @description Checking this algorithm with no items
 */

var x = [0,1];
var arr = x.concat();

//CHECK#0
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#0: var x = [0,1]; var arr = x.concat(); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#1
if (arr[0] !== 0) {
  $ERROR('#1: var x = [0,1]; var arr = x.concat(); arr[0] === 0. Actual: ' + (arr[0]));
}

//CHECK#2
if (arr[1] !== 1) {
  $ERROR('#2: var x = [0,1]; var arr = x.concat(); arr[1] === 1. Actual: ' + (arr[1]));
}

//CHECK#3
if (arr.length !== 2) {
  $ERROR('#3: var x = [0,1]; var arr = x.concat(); arr.length === 2. Actual: ' + (arr.length));
}  

//CHECK#4
if (arr === x) {
  $ERROR('#4: var x = [0,1]; var arr = x.concat(); arr !== x');
}              

