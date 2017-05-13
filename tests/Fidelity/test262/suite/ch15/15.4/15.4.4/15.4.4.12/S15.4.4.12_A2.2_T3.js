// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator use ToInteger from deleteCount
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A2.2_T3.js
 * @description deleteCount = Infinity
 */

var x = [0,1,2,3];
var arr = x.splice(0,Number.POSITIVE_INFINITY);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 4) {
  $ERROR('#2: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); arr.length === 4. Actual: ' + (arr.length));
}      

//CHECK#3
if (arr[0] !== 0) {
  $ERROR('#3: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); arr[0] === 0. Actual: ' + (arr[0]));
}

//CHECK#4
if (arr[1] !== 1) {
  $ERROR('#4: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); arr[1] === 1. Actual: ' + (arr[1]));
}      

//CHECK#5
if (arr[2] !== 2) {
  $ERROR('#5: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); arr[2] === 2. Actual: ' + (arr[2]));
}   

//CHECK#6
if (arr[3] !== 3) {
  $ERROR('#6: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); arr[3] === 3. Actual: ' + (arr[3]));
} 

//CHECK#7
if (x.length !== 0) {
  $ERROR('#7: var x = [0,1,2,3]; var arr = x.splice(0,Number.POSITIVE_INFINITY); x.length === 0. Actual: ' + (x.length));
} 

