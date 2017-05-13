// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToInteger from end
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A2.2_T1.js
 * @description end is not integer
 */

var x = [0,1,2,3,4];
var arr = x.slice(2,4.5);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var x = [0,1,2,3,4]; var arr = x.slice(2,4.5); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 2) {
  $ERROR('#2: var x = [0,1,2,3,4]; var arr = x.slice(2,4.5); arr.length === 2. Actual: ' + (arr.length));
}      

//CHECK#3
if (arr[0] !== 2) {
  $ERROR('#3: var x = [0,1,2,3,4]; var arr = x.slice(2,4.5); arr[0] === 2. Actual: ' + (arr[0]));
}

//CHECK#4
if (arr[1] !== 3) {
  $ERROR('#4: var x = [0,1,2,3,4]; var arr = x.slice(2,4.5); arr[1] === 3. Actual: ' + (arr[1]));
}      

//CHECK#5
if (arr[3] !== undefined) {
  $ERROR('#5: var x = [0,1,2,3,4]; var arr = x.slice(2,4.5); arr[3] === undefined. Actual: ' + (arr[3]));
} 

