// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is not a string value, return x
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A1.1_T1.js
 * @description Checking all primitive
 */

//CHECK#1
var x = 1;
if (eval(x) !== x) {
  $ERROR('#1: x = 1; eval(x) === x. Actual: ' + (eval(x)));
}

//CHECK#2
if (eval(1) !== 1) {
  $ERROR('#2: eval(1) === 1. Actual: ' + (eval(1)));
}

//CHECK#3
if (eval(true) !== true) {
  $ERROR('#3: eval(true) === true. Actual: ' + (eval(true)));
}

//CHECK#4
if (eval(null) !== null) {
  $ERROR('#4: eval(null) === null. Actual: ' + (eval(null)));
}

//CHECK#5
if (eval(undefined) !== undefined) {
  $ERROR('#5: eval(undefined) === undefined. Actual: ' + (eval(undefined)));
}        

