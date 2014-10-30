// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If start is negative, use max(start + length, 0).
 * If deleteCount is negative, use 0
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A1.2_T4.js
 * @description -length < start = deleteCount < 0, itemCount > 0
 */

var x = [0,1];
var arr = x.splice(-1,-1,2,3);

//CHECK#0
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#0: var x = [0,1]; var arr = x.splice(-1,-1,2,3); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#1
if (arr.length !== 0) {
  $ERROR('#1: var x = [0,1]; var arr = x.splice(-1,-1,2,3); arr.length === 0. Actual: ' + (arr.length));
}   

//CHECK#2
if (x.length !== 4) {
  $ERROR('#2: var x = [0,1]; var arr = x.splice(-1,-1,2,3); x.length === 4. Actual: ' + (x.length));
}      

//CHECK#3
if (x[0] !== 0) {
  $ERROR('#3: var x = [0,1]; var arr = x.splice(-1,-1,2,3); x[0] === 0. Actual: ' + (x[0]));
}

//CHECK#4
if (x[1] !== 2) {
  $ERROR('#4: var x = [0,1]; var arr = x.splice(-1,-1,2,3); x[1] === 2. Actual: ' + (x[1]));
}

//CHECK#5
if (x[2] !== 3) {
  $ERROR('#5: var x = [0,1]; var arr = x.splice(-1,-1,2,3); x[2] === 3. Actual: ' + (x[2]));
}

//CHECK#6
if (x[3] !== 1) {
  $ERROR('#6: var x = [0,1]; var arr = x.splice(-1,-1,2,3); x[3] === 1. Actual: ' + (x[3]));
} 

