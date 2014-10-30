// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Splice with undefined arguments
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A1.5_T2.js
 * @description end === undefined
 */

var x = [0,1,2,3];
var arr = x.splice(1,undefined);

//CHECK#1
arr.getClass = Object.prototype.toString;
if (arr.getClass() !== "[object " + "Array" + "]") {
  $ERROR('#1: var x = [0,1,2,3]; var arr = x.splice(1,undefined); arr is Array object. Actual: ' + (arr.getClass()));
}

//CHECK#2
if (arr.length !== 0) {
  $ERROR('#2: var x = [0,1,2,3]; var arr = x.splice(1,undefined); arr.length === 0. Actual: ' + (arr.length));
}      

//CHECK#3
if (x.length !== 4) {
  $ERROR('#3: var x = [0,1,2,3]; var arr = x.splice(1,undefined); x.length === 4. Actual: ' + (x.length));
} 

//CHECK#4
if (x[0] !== 0) {
  $ERROR('#4: var x = [0,1,2,3]; var arr = x.splice(1,undefined); x[0] === 0. Actual: ' + (x[0]));
}

//CHECK#5
if (x[1] !== 1) {
  $ERROR('#5: var x = [0,1,2,3]; var arr = x.splice(1,undefined); x[1] === 1. Actual: ' + (x[1]));
} 

//CHECK#6
if (x[2] !== 2) {
  $ERROR('#6: var x = [0,1,2,3]; var arr = x.splice(1,undefined); x[2] === 2. Actual: ' + (x[2]));
}

//CHECK#7
if (x[3] !== 3) {
  $ERROR('#7: var x = [0,1,2,3]; var arr = x.splice(1,undefined); x[3] === 3. Actual: ' + (x[3]));
}     

