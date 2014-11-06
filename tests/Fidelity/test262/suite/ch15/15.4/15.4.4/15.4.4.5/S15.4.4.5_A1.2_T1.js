// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If separator is undefined, a single comma is used as the separator
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A1.2_T1.js
 * @description Checking this use new Array() and []
 */

//CHECK#1
var x = new Array(0,1,2,3);
if (x.join() !== "0,1,2,3") {
  $ERROR('#1: x = new Array(0,1,2,3); x.join() === "0,1,2,3". Actual: ' + (x.join()));
}

//CHECK#2
x = [];
x[0] = 0;
x[3] = 3;
if (x.join() !== "0,,,3") {
  $ERROR('#2: x = []; x[0] = 0; x[3] = 3; x.join() === "0,,,3". Actual: ' + (x.join()));
}

//CHECK#3
x = [];
x[0] = 0;
if (x.join() !== "0") {
  $ERROR('#3: x = []; x[0] = 0; x.join() === "0". Actual: ' + (x.join()));
}

