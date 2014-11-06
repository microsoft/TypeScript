// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If array element is undefined or null, use the empty string
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A1.3_T1.js
 * @description Checking this use new Array() and []
 */

//CHECK#1
var x = [];
x[0] = undefined;
if (x.join() !== "") {
  $ERROR('#1: x = []; x[0] = undefined; x.join() === "". Actual: ' + (x.join()));
}

//CHECK#2
x = [];
x[0] = null;
if (x.join() !== "") {
  $ERROR('#2: x = []; x[0] = null; x.join() === "". Actual: ' + (x.join()));
}

//CHECK#3
x = Array(undefined,1,null,3);
if (x.join() !== ",1,,3") {
  $ERROR('#3: x = Array(undefined,1,null,3); x.join() === ",1,,3". Actual: ' + (x.join()));
}

