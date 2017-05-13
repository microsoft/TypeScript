// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If [[Get]] ToString(j) is undefined, return 1.
 * If [[]Get] ToString(k) is undefined, return -1
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A1.4_T2.js
 * @description If comparefn is not undefined
 */

var myComparefn = function(x,y) {
  if (x === undefined) return -1; 
  if (y === undefined) return 1;
  return 0;
}

var x = new Array(undefined, 1);
x.sort(myComparefn);

//CHECK#1
if (x.length !== 2) {
  $ERROR('#1: var x = new Array(undefined, 1); x.sort(myComparefn); x.length === 2. Actual: ' + (x.length));
}

//CHECK#2
if (x[0] !== 1) {
  $ERROR('#2: var x = new Array(undefined, 1); x.sort(myComparefn); x[0] === 1. Actual: ' + (x[0]));
}    

//CHECK#3
if (x[1] !== undefined) {
  $ERROR('#3: var x = new Array(undefined, 1); x.sort(myComparefn); x[1] === undefined. Actual: ' + (x[1]));
}

var x = new Array(1, undefined);
x.sort(myComparefn);

//CHECK#4
if (x.length !== 2) {
  $ERROR('#4: var x = new Array(1, undefined); x.sort(myComparefn); x.length === 2. Actual: ' + (x.length));
}

//CHECK#5
if (x[0] !== 1) {
  $ERROR('#5: var x = new Array(1, undefined); x.sort(myComparefn); x[0] === 1. Actual: ' + (x[0]));
}    

//CHECK#6
if (x[1] !== undefined) {
  $ERROR('#6: var x = new Array(1, undefined); x.sort(myComparefn); x[1] === undefined. Actual: ' + (x[1]));
}  

