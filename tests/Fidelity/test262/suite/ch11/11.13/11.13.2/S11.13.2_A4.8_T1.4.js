// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production x >>>= y is the same as x = x >>> y
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A4.8_T1.4.js
 * @description Type(x) and Type(y) vary between Null and Undefined
 */

//CHECK#1
x = null;
x >>>= undefined;
if (x !== 0) {
  $ERROR('#1: x = null; x >>>= undefined; x === 0. Actual: ' + (x));
}

//CHECK#2
x = undefined;
x >>>= null;
if (x !== 0) {
  $ERROR('#2: x = undefined; x >>>= null; x === 0. Actual: ' + (x));
}

//CHECK#3
x = undefined;
x >>>= undefined;
if (x !== 0) {
  $ERROR('#3: x = undefined; x >>>= undefined; x === 0. Actual: ' + (x));
}

//CHECK#4
x = null;
x >>>= null;
if (x !== 0) {
  $ERROR('#4: x = null; x >>>= null; x === 0. Actual: ' + (x));
}

