// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The splice function is intentionally generic.
 * It does not require that its this value be an Array object
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A2_T1.js
 * @description If start is positive, use min(start, length).
 * If deleteCount is positive, use min(deleteCount, length - start)
 */

var obj = {0:0,1:1,2:2,3:3};
obj.length = 4;
obj.splice = Array.prototype.splice;
var arr = obj.splice(0,3,4,5);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 3) {
  $ERROR('#2: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); arr.length === 3. Actual: ' + (arr.length));
}      

//CHECK#3
if (arr[0] !== 0) {
  $ERROR('#3: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); arr[0] === 0. Actual: ' + (arr[0]));
}

//CHECK#4
if (arr[1] !== 1) {
  $ERROR('#4: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); arr[1] === 1. Actual: ' + (arr[1]));
}      

//CHECK#5
if (arr[2] !== 2) {
  $ERROR('#5: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); arr[2] === 2. Actual: ' + (arr[2]));
}   

//CHECK#6
if (obj.length !== 3) {
  $ERROR('#6: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); obj.length === 3. Actual: ' + (obj.length));
} 

//CHECK#7
if (obj[0] !== 4) {
  $ERROR('#7: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); obj[0] === 4. Actual: ' + (obj[0]));
}

//CHECK#8
if (obj[1] !== 5) {
  $ERROR('#8: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); obj[1] === 5. Actual: ' + (obj[1]));
} 

//CHECK#9
if (obj[2] !== 3) {
  $ERROR('#9: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); obj[2] === 3. Actual: ' + (obj[2]));
}

//CHECK#10
if (obj[3] !== undefined) {
  $ERROR('#10: var obj = {0:0,1:1,2:2,3:3}; obj.length = 4; obj.splice = Array.prototype.splice; var arr = obj.splice(0,3,4,5); obj[3] === undefined. Actual: ' + (obj[3]));
}

