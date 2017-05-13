// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Type(x) and Type(y) are Number-s minus NaN, +0, -0.
 * Return true, if x is the same number value as y; otherwise, return false
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A4.3.js
 * @description x and y are primitive numbers
 */

//CHECK#1
if ((Number.POSITIVE_INFINITY == Number.POSITIVE_INFINITY) !== true) {
  $ERROR('#1: (+Infinity == +Infinity) === true');
}

//CHECK#2
if ((Number.NEGATIVE_INFINITY == Number.NEGATIVE_INFINITY) !== true) {
  $ERROR('#2: (-Infinity == -Infinity) === true');
}

//CHECK#3
if ((Number.POSITIVE_INFINITY == -Number.NEGATIVE_INFINITY) !== true) {
  $ERROR('#3: (+Infinity == -(-Infinity)) === true');
}

//CHECK#4
if ((1 == 0.999999999999) !== false) {
  $ERROR('#4: (1 == 0.999999999999) === false');
}

//CHECK#5
if ((1.0 == 1) !== true) {
  $ERROR('#5: (1.0 == 1) === true');
}

