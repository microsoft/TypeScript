// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If length equal zero, call the [[Put]] method of this object
 * with arguments "length" and 0 and return undefined
 *
 * @path ch15/15.4/15.4.4/15.4.4.9/S15.4.4.9_A1.1_T1.js
 * @description Checking this algorithm
 */

//CHECK#1
var x = new Array();
var shift = x.shift();
if (shift !== undefined) {
  $ERROR('#1: var x = new Array(); x.shift() === undefined. Actual: ' + (shift));
}  

//CHECK#2
if (x.length !== 0) {
  $ERROR('#2: var x = new Array(); x.shift(); x.length === 0. Actual: ' + (x.length));
}  

//CHECK#3
var x = Array(1,2,3);
x.length = 0;
var shift = x.shift();
if (shift !== undefined) {
  $ERROR('#2: var x = Array(1,2,3); x.length = 0; x.shift() === undefined. Actual: ' + (shift));
} 

//CHECK#4
if (x.length !== 0) {
  $ERROR('#4: var x = new Array(1,2,3); x.length = 0; x.shift(); x.length === 0. Actual: ' + (x.length));
}  

