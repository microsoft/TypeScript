// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The slice function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A2_T6.js
 * @description If end is undefined use length
 */

var obj = {};
obj.slice = Array.prototype.slice;
obj[0] = 0;
obj[1] = 1;
obj[2] = 2;
obj[3] = 3;
obj[4] = 4;
obj.length = 5;
var arr = obj.slice(2, undefined);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var obj = {}; obj.slice = Array.prototype.slice; obj[0] = 0; obj[1] = 1; obj[2] = 2; obj[3] = 3; obj[4] = 4; obj.length = 5; var arr = obj.slice(2, undefined); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 3) {
  $ERROR('#2: var obj = {}; obj.slice = Array.prototype.slice; obj[0] = 0; obj[1] = 1; obj[2] = 2; obj[3] = 3; obj[4] = 4; obj.length = 5; var arr = obj.slice(2, undefined); arr.length === 3. Actual: ' + (arr.length));
}      

//CHECK#3
if (arr[0] !== 2) {
  $ERROR('#3: var obj = {}; obj.slice = Array.prototype.slice; obj[0] = 0; obj[1] = 1; obj[2] = 2; obj[3] = 3; obj[4] = 4; obj.length = 5; var arr = obj.slice(2, undefined); arr[0] === 2. Actual: ' + (arr[0]));
}

//CHECK#4
if (arr[1] !== 3) {
  $ERROR('#4: var obj = {}; obj.slice = Array.prototype.slice; obj[0] = 0; obj[1] = 1; obj[2] = 2; obj[3] = 3; obj[4] = 4; obj.length = 5; var arr = obj.slice(2, undefined); arr[1] === 3. Actual: ' + (arr[1]));
}      

//CHECK#5
if (arr[2] !== 4) {
  $ERROR('#5: var obj = {}; obj.slice = Array.prototype.slice; obj[0] = 0; obj[1] = 1; obj[2] = 2; obj[3] = 3; obj[4] = 4; obj.length = 5; var arr = obj.slice(2, undefined); arr[2] === 4. Actual: ' + (arr[2]));
}   

//CHECK#6
if (arr[3] !== undefined) {
  $ERROR('#6: var obj = {}; obj.slice = Array.prototype.slice; obj[0] = 0; obj[1] = 1; obj[2] = 2; obj[3] = 3; obj[4] = 4; obj.length = 5; var arr = obj.slice(2, undefined); arr[3] === undefined. Actual: ' + (arr[3]));
}   

