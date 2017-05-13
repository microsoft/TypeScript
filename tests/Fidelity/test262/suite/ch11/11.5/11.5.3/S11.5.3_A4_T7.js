// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a ECMAScript floating-point remainder operation is determined by the rules of IEEE arithmetics
 *
 * @path ch11/11.5/11.5.3/S11.5.3_A4_T7.js
 * @description If operands neither an infinity, nor a zero, nor NaN, return x - truncate(x / y) * y
 */

function truncate(x) {
  if (x > 0) {
    return Math.floor(x);
  } else {
    return Math.ceil(x);
  }
}

//CHECK#1
x = 1.3; 
y = 1.1;
if (x % y !== 0.19999999999999996) {
  $ERROR('#1: x = 1.3; y = 1.1; x % y === 0.19999999999999996. Actual: ' + (x % y));
}

//CHECK#2
x = -1.3; 
y = 1.1; 
if (x % y !== -0.19999999999999996) {
  $ERROR('#2: x = -1.3; y = 1.1; x % y === -0.19999999999999996. Actual: ' + (x % y));
}

//CHECK#3
x = 1.3; 
y = -1.1;
if (x % y !== 0.19999999999999996) {
  $ERROR('#3: x = 1.3; y = -1.1; x % y === 0.19999999999999996. Actual: ' + (x % y));
}

//CHECK#4
x = -1.3; 
y = -1.1;
if (x % y !== -0.19999999999999996) {
  $ERROR('#4: x = -1.3; y = -1.1; x % y === -0.19999999999999996. Actual: ' + (x % y));
}

//CHECK#5
x = 1.3; 
y = 1.1;
if (x % y !== x - truncate(x / y) * y) {
  $ERROR('#5: x = 1.3; y = 1.1; x % y === x - truncate(x / y) * y. Actual: ' + (x % y));
}

//CHECK#6
x = -1.3; 
y = 1.1; 
if (x % y !== x - truncate(x / y) * y) {
  $ERROR('#6: x = -1.3; y = 1.1; x % y === x - truncate(x / y) * y. Actual: ' + (x % y));
}

//CHECK#7
x = 1.3; 
y = -1.1;
if (x % y !== x - truncate(x / y) * y) {
  $ERROR('#7: x = 1.3; y = -1.1; x % y === x - truncate(x / y) * y. Actual: ' + (x % y));
}

//CHECK#8
x = -1.3; 
y = -1.1;
if (x % y !== x - truncate(x / y) * y) {
  $ERROR('#8: x = -1.3; y = -1.1; x % y === x - truncate(x / y) * y. Actual: ' + (x % y));
}

