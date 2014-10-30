// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The arguments are appended to the end of the array, in
 * the order in which they appear. The new length of the array is returned
 * as the result of the call
 *
 * @path ch15/15.4/15.4.4/15.4.4.7/S15.4.4.7_A1_T2.js
 * @description Checking case when push is given many arguments
 */

//CHECK#1
var x = [];
if (x.length !== 0) {
  $ERROR('#1: x = []; x.length === 0. Actual: ' + (x.length));
}

//CHECK#2
x[0] = 0;
var push = x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1);
if (push !== 6) {
  $ERROR('#2: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1) === 6. Actual: ' + (push));
}  

//CHECK#3
if (x[0] !== 0) {
  $ERROR('#3: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[0] === 0. Actual: ' + (x[0]));
}

//CHECK#4
if (x[1] !== true) {
  $ERROR('#4: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[1] === true. Actual: ' + (x[1]));
}

//CHECK#5
if (x[2] !== Number.POSITIVE_INFINITY) {
  $ERROR('#5: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[2] === Number.POSITIVE_INFINITY. Actual: ' + (x[2]));
}  

//CHECK#6
if (x[3] !== "NaN") {
  $ERROR('#6: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[3] === "NaN". Actual: ' + (x[3]));
} 

//CHECK#7
if (x[4] !== "1") {
  $ERROR('#7: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[4] === "1". Actual: ' + (x[4]));
}

//CHECK#8
if (x[5] !== -1) {
  $ERROR('#8: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[5] === -1. Actual: ' + (x[5]));
}

//CHECK#9
if (x.length !== 6) {
  $ERROR('#9: x = []; x[0] = 0; x.push(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x.length === 6. Actual: ' + (x.length));
}

