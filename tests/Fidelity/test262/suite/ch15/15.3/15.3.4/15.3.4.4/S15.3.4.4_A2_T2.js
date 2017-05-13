// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the call method is 1
 *
 * @path ch15/15.3/15.3.4/15.3.4.4/S15.3.4.4_A2_T2.js
 * @description Checking f.call.length, where f is new Function
 */

var f=new Function;

//CHECK#1
if (typeof f.call !== "function") {
  $ERROR('#1: call method accessed');
}

//CHECK#2
if (typeof f.call.length === "undefined") {
  $ERROR('#2: length property of call method defined');
}

//CHECK#3
if (f.call.length !== 1) {
  $ERROR('#3: The length property of the call method is 1');
}

