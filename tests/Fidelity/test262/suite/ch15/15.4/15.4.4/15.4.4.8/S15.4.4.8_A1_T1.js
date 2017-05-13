// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The elements of the array are rearranged so as to reverse their order.
 * The object is returned as the result of the call
 *
 * @path ch15/15.4/15.4.4/15.4.4.8/S15.4.4.8_A1_T1.js
 * @description Checking case when reverse is given no arguments or one argument
 */

//CHECK#1
var x = [];
var reverse = x.reverse();
if (reverse !== x) {
  $ERROR('#1: x = []; x.reverse() === x. Actual: ' + (reverse));
}  

//CHECK#2
x = [];
x[0] = 1;
var reverse = x.reverse();
if (reverse !== x) {
  $ERROR('#2: x = []; x[0] = 1; x.reverse() === x. Actual: ' + (reverse));
}

//CHECK#3
x = new Array(1,2);
var reverse = x.reverse();
if (reverse !== x) {
  $ERROR('#3: x = new Array(1,2); x.reverse() === x. Actual: ' + (reverse));
}

//CHECK#4
if (x[0] !== 2) {
  $ERROR('#4: x = new Array(1,2); x.reverse(); x[0] === 2. Actual: ' + (x[0]));
}

//CHECK#5
if (x[1] !== 1) {
  $ERROR('#5: x = new Array(1,2); x.reverse(); x[1] === 1. Actual: ' + (x[1]));
} 

//CHECK#6
if (x.length !== 2) {
  $ERROR('#6: x = new Array(1,2); x.reverse(); x.length === 2. Actual: ' + (x.length));
}              

