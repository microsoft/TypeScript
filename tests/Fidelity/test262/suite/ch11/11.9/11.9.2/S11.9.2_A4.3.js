// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Type(x) and Type(y) are Number-s minus NaN, +0, -0.
 * Return false, if x is the same number value as y; otherwise, return true
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A4.3.js
 * @description x and y are primitive numbers
 */

//CHECK#1
if ((Number.POSITIVE_INFINITY != Number.POSITIVE_INFINITY) !== false) {
  $ERROR('#1: (+Infinity != +Infinity) === false');
}

//CHECK#2
if ((Number.NEGATIVE_INFINITY != Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#2: (-Infinity != -Infinity) === false');
}

//CHECK#3
if ((Number.POSITIVE_INFINITY != -Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#3: (+Infinity != -(-Infinity)) === false');
}

//CHECK#4
if ((1 != 0.999999999999) !== true) {
  $ERROR('#4: (1 != 0.999999999999) === true');
}

//CHECK#5
if ((1.0 != 1) !== false) {
  $ERROR('#5: (1.0 != 1) === false');
}

