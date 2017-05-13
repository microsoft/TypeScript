// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToInteger from deleteCount
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A2.2_T4.js
 * @description deleteCount = -Infinity
 */

var x = [0,1];
var arr = x.splice(0,Number.NEGATIVE_INFINITY);

//CHECK#0
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#0: var x = [0,1]; var arr = x.splice(0,Number.NEGATIVE_INFINITY); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#1
if (arr.length !== 0) {
  $ERROR('#1: var x = [0,1]; var arr = x.splice(0,Number.NEGATIVE_INFINITY); arr.length === 0. Actual: ' + (arr.length));
}   

//CHECK#2
if (x.length !== 2) {
  $ERROR('#2: var x = [0,1]; var arr = x.splice(0,Number.NEGATIVE_INFINITY); x.length === 2. Actual: ' + (x.length));
}      

//CHECK#3
if (x[0] !== 0) {
  $ERROR('#3: var x = [0,1]; var arr = x.splice(0,Number.NEGATIVE_INFINITY); x[0] === 0. Actual: ' + (x[0]));
}

//CHECK#4
if (x[1] !== 1) {
  $ERROR('#4: var x = [0,1]; var arr = x.splice(0,Number.NEGATIVE_INFINITY); x[1] === 1. Actual: ' + (x[1]));
}

