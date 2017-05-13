// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of calling this function is the same as if
 * the built-in join method were invoked for this object with no argument
 *
 * @path ch15/15.4/15.4.4/15.4.4.2/S15.4.4.2_A1_T2.js
 * @description The elements of the array are converted to strings, and these strings are
 * then concatenated, separated by occurrences of the separator. If no separator is provided,
 * a single comma is used as the separator
 */

//CHECK#1
var x = new Array(0,1,2,3);
if (x.toString() !== x.join()) {
  $ERROR('#1.1: x = new Array(0,1,2,3); x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "0,1,2,3") {
    $ERROR('#1.2: x = new Array(0,1,2,3); x.toString() === "0,1,2,3". Actual: ' + (x.toString()));
  }
}

//CHECK#2
x = [];
x[0] = 0;
x[3] = 3;
if (x.toString() !== x.join()) {
  $ERROR('#2.1: x = []; x[0] = 0; x[3] = 3; x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "0,,,3") {
    $ERROR('#2.2: x = []; x[0] = 0; x[3] = 3; x.toString() === "0,,,3". Actual: ' + (x.toString()));
  }
}

//CHECK#3
x = Array(undefined,1,null,3);
if (x.toString() !== x.join()) {
  $ERROR('#3.1: x = Array(undefined,1,null,3); x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== ",1,,3") {
    $ERROR('#3.2: x = Array(undefined,1,null,3); x.toString() === ",1,,3". Actual: ' + (x.toString()));
  }
}

//CHECK#4
x = [];
x[0] = 0;
if (x.toString() !== x.join()) {
  $ERROR('#4.1: x = []; x[0] = 0; x.toString() === x.join(). Actual: ' + (x.toString()));
} else {
  if (x.toString() !== "0") {
    $ERROR('#4.2: x = []; x[0] = 0; x.toString() === "0". Actual: ' + (x.toString()));
  }
}

