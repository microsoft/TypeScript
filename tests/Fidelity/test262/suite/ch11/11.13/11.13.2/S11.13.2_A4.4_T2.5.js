// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production x += y is the same as x = x + y
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A4.4_T2.5.js
 * @description Type(x) is different from Type(y) and both types vary between Boolean (primitive or object) and Null
 */

//CHECK#1
x = true;
x += null;
if (x !== 1) {
  $ERROR('#1: x = true; x += null; x === 1. Actual: ' + (x));
}

//CHECK#2
x = null;
x += true;
if (x !== 1) {
  $ERROR('#2: x = null; x += true; x === 1. Actual: ' + (x));
}

//CHECK#3
x = new Boolean(true);
x += null;
if (x !== 1) {
  $ERROR('#3: x = new Boolean(true); x += null; x === 1. Actual: ' + (x));
}

//CHECK#4
x = null;
x += new Boolean(true);
if (x !== 1) {
  $ERROR('#4: x = null; x += new Boolean(true); x === 1. Actual: ' + (x));
}

