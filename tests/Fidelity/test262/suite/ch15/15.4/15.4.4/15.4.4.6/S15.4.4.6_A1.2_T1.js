// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The last element of the array is removed from the array
 * and returned
 *
 * @path ch15/15.4/15.4.4/15.4.4.6/S15.4.4.6_A1.2_T1.js
 * @description Checking this use new Array() and []
 */

//CHECK#1
var x = new Array(0,1,2,3);
var pop = x.pop();
if (pop !== 3) {
  $ERROR('#1: x = new Array(0,1,2,3); x.pop() === 3. Actual: ' + (pop));
}

//CHECK#2
if (x.length !== 3) {
  $ERROR('#2: x = new Array(0,1,2,3); x.pop(); x.length == 3');
}

//CHECK#3
if (x[3] !== undefined) {
  $ERROR('#3: x = new Array(0,1,2,3); x.pop(); x[3] == undefined');
}

//CHECK#4
if (x[2] !== 2) {
  $ERROR('#4: x = new Array(0,1,2,3); x.pop(); x[2] == 2');
}

//CHECK#5
x = [];
x[0] = 0;
x[3] = 3;
var pop = x.pop();
if (pop !== 3) {
  $ERROR('#5: x = []; x[0] = 0; x[3] = 3; x.pop() === 3. Actual: ' + (pop));
}

//CHECK#6
if (x.length !== 3) {
  $ERROR('#6: x = []; x[0] = 0; x[3] = 3; x.pop(); x.length == 3');
}

//CHECK#7
if (x[3] !== undefined) {
  $ERROR('#7: x = []; x[0] = 0; x[3] = 3; x.pop(); x[3] == undefined');
}

//CHECK#8
if (x[2] !== undefined) {
  $ERROR('#8: x = []; x[0] = 0; x[3] = 3; x.pop(); x[2] == undefined');
}

//CHECK#9
x.length = 1;
var pop = x.pop();
if (pop !== 0) {
  $ERROR('#9: x = []; x[0] = 0; x[3] = 3; x.pop(); x.length = 1; x.pop() === 0. Actual: ' + (pop));
}

//CHECK#10
if (x.length !== 0) {
  $ERROR('#10: x = []; x[0] = 0; x[3] = 3; x.pop(); x.length = 1; x.pop(); x.length === 0. Actual: ' + (x.length));
}

