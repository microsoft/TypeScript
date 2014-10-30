// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If start is negative, use max(start + length, 0).
 * If deleteCount is positive, use min(deleteCount, length - start)
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A1.4_T4.js
 * @description length > -start = deleteCount > 0, itemCount > 0
 */

var x = [0,1,2,3];
var arr = x.splice(-3,3,4,5);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 3) {
  $ERROR('#2: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); arr.length === 3. Actual: ' + (arr.length));
}      

//CHECK#3
if (arr[0] !== 1) {
  $ERROR('#3: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); arr[0] === 1. Actual: ' + (arr[0]));
}

//CHECK#4
if (arr[1] !== 2) {
  $ERROR('#4: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); arr[1] === 2. Actual: ' + (arr[1]));
}      

//CHECK#5
if (arr[2] !== 3) {
  $ERROR('#5: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); arr[2] === 3. Actual: ' + (arr[2]));
}   

//CHECK#6
if (x.length !== 3) {
  $ERROR('#6: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); x.length === 3. Actual: ' + (x.length));
} 

//CHECK#7
if (x[0] !== 0) {
  $ERROR('#7: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); x[0] === 0. Actual: ' + (x[0]));
}

//CHECK#8
if (x[1] !== 4) {
  $ERROR('#8: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); x[1] === 4. Actual: ' + (x[1]));
} 

//CHECK#9
if (x[2] !== 5) {
  $ERROR('#9: var x = [0,1,2,3]; var arr = x.splice(-3,3,4,5); x[2] === 5. Actual: ' + (x[2]));
}  

