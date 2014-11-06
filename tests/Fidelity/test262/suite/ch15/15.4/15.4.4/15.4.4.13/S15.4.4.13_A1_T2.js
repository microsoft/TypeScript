// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The arguments are prepended to the start of the array, such that
 * their order within the array is the same as the order in which they appear in
 * the argument list
 *
 * @path ch15/15.4/15.4.4/15.4.4.13/S15.4.4.13_A1_T2.js
 * @description Checking case when unsift is given many arguments
 */

//CHECK#1
var x = [];
if (x.length !== 0) {
  $ERROR('#1: x = []; x.length === 0. Actual: ' + (x.length));
}

//CHECK#2
x[0] = 0;
var unshift = x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1);
if (unshift !== 6) {
  $ERROR('#2: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1) === 6. Actual: ' + (unshift));
}  

//CHECK#3
if (x[5] !== 0) {
  $ERROR('#3: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[5] === 0. Actual: ' + (x[5]));
}

//CHECK#4
if (x[0] !== true) {
  $ERROR('#4: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[0] === true. Actual: ' + (x[0]));
}

//CHECK#5
if (x[1] !== Number.POSITIVE_INFINITY) {
  $ERROR('#5: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[1] === Number.POSITIVE_INFINITY. Actual: ' + (x[1]));
}  

//CHECK#6
if (x[2] !== "NaN") {
  $ERROR('#6: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[2] === "NaN". Actual: ' + (x[2]));
} 

//CHECK#7
if (x[3] !== "1") {
  $ERROR('#7: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[3] === "1". Actual: ' + (x[3]));
}

//CHECK#8
if (x[4] !== -1) {
  $ERROR('#8: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x[4] === -1. Actual: ' + (x[4]));
}

//CHECK#9
if (x.length !== 6) {
  $ERROR('#9: x = []; x[0] = 0; x.unshift(true, Number.POSITIVE_INFINITY, "NaN", "1", -1); x.length === 6. Actual: ' + (x.length));
}

