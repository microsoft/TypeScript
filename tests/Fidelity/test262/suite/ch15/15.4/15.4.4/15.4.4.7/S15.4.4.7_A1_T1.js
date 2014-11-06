// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The arguments are appended to the end of the array, in
 * the order in which they appear. The new length of the array is returned
 * as the result of the call
 *
 * @path ch15/15.4/15.4.4/15.4.4.7/S15.4.4.7_A1_T1.js
 * @description Checking case when push is given no arguments or one argument
 */

//CHECK#1
var x = new Array();
var push = x.push(1);
if (push !== 1) {
  $ERROR('#1: x = new Array(); x.push(1) === 1. Actual: ' + (push));
}  

//CHECK#2
if (x[0] !== 1) {
  $ERROR('#2: x = new Array(); x.push(1); x[0] === 1. Actual: ' + (x[0]));
}

//CHECK#3
var push = x.push();
if (push !== 1) {
  $ERROR('#3: x = new Array(); x.push(1); x.push() === 1. Actual: ' + (push));
}

//CHECK#4
if (x[1] !== undefined) {
  $ERROR('#4: x = new Array(); x.push(1); x.push(); x[1] === unedfined. Actual: ' + (x[1]));
}

//CHECK#5
var push = x.push(-1);
if (push !== 2) {
  $ERROR('#5: x = new Array(); x.push(1); x.push(); x.push(-1) === 2. Actual: ' + (push));
}

//CHECK#6
if (x[1] !== -1) {
  $ERROR('#6: x = new Array(); x.push(1); x.push(-1); x[1] === -1. Actual: ' + (x[1]));
}

//CHECK#7
if (x.length !== 2) {
  $ERROR('#7: x = new Array(); x.push(1); x.push(); x.push(-1); x.length === 2. Actual: ' + (x.length));
} 

