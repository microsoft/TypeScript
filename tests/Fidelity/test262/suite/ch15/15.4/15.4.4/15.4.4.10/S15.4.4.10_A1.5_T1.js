// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If end is undefined use length
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A1.5_T1.js
 * @description end === undefined
 */

var x = [0,1,2,3,4];
var arr = x.slice(3, undefined);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var x = [0,1,2,3,4]; var arr = x.slice(3, undefined); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 2) {
  $ERROR('#2: var x = [0,1,2,3,4]; var arr = x.slice(3, undefined); arr.length === 2. Actual: ' + (arr.length));
}      

//CHECK#3
if (arr[0] !== 3) {
  $ERROR('#3: var x = [0,1,2,3,4]; var arr = x.slice(3, undefined); arr[0] === 3. Actual: ' + (arr[0]));
}

//CHECK#4
if (arr[1] !== 4) {
  $ERROR('#4: var x = [0,1,2,3,4]; var arr = x.slice(3, undefined); arr[1] === 4. Actual: ' + (arr[1]));
}

//CHECK#5
if (arr[2] !== undefined) {
  $ERROR('#5: var x = [0,1,2,3,4]; var arr = x.slice(3, undefined); arr[2] === undefined. Actual: ' + (arr[2]));
} 

