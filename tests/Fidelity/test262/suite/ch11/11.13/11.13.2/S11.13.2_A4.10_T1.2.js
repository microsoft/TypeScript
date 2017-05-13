// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production x ^= y is the same as x = x ^ y
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A4.10_T1.2.js
 * @description Type(x) and Type(y) vary between primitive number and Number object
 */

//CHECK#1
x = 1;
x ^= 1;
if (x !== 0) {
  $ERROR('#1: x = 1; x ^= 1; x === 0. Actual: ' + (x));
}

//CHECK#2
x = new Number(1);
x ^= 1;
if (x !== 0) {
  $ERROR('#2: x = new Number(1); x ^= 1; x === 0. Actual: ' + (x));
}

//CHECK#3
x = 1;
x ^= new Number(1);
if (x !== 0) {
  $ERROR('#3: x = 1; x ^= new Number(1); x === 0. Actual: ' + (x));
}

//CHECK#4
x = new Number(1);
x ^= new Number(1);
if (x !== 0) {
  $ERROR('#4: x = new Number(1); x ^= new Number(1); x === 0. Actual: ' + (x));
}


