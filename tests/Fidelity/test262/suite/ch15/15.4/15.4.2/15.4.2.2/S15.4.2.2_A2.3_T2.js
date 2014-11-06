// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the argument len is not a Number, then the length property of
 * the newly constructed object is set to 1 and the 0 property of
 * the newly constructed object is set to len
 *
 * @path ch15/15.4/15.4.2/15.4.2.2/S15.4.2.2_A2.3_T2.js
 * @description Checking for boolean primitive and Boolean object
 */

var x = new Array(true);

//CHECK#1 
if (x.length !== 1) {
  $ERROR('#1: var x = new Array(true); x.length === 1. Actual: ' + (x.length));
}

//CHECK#2
if (x[0] !== true) {
  $ERROR('#2: var x = new Array(true); x[0] === true. Actual: ' + (x[0]));
}

var obj = new Boolean(false);
var x = new Array(obj);

//CHECK#3 
if (x.length !== 1) {
  $ERROR('#3: var obj = new Boolean(false); var x = new Array(obj); x.length === 1. Actual: ' + (x.length));
}

//CHECK#4
if (x[0] !== obj) {
  $ERROR('#4: var obj = new Boolean(false); var x = new Array(obj); x[0] === obj. Actual: ' + (x[0]));
}

