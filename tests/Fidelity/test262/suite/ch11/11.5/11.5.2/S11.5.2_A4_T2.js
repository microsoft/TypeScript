// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of division is determined by the specification of IEEE 754 arithmetics
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A4_T2.js
 * @description The sign of the result is positive if both operands have the same sign, negative if the operands have different signs
 */

//CHECK#1
if (1 / 1 !== 1) {
  $ERROR('#1: 1 / 1 === 1. Actual: ' + (1 / 1));
}

//CHECK#2
if (1 / -1 !== -1) {
  $ERROR('#2: 1 / -1 === -1. Actual: ' + (1 / -1));
}

//CHECK#3
if (-1 / 1 !== -1) {
  $ERROR('#3: -1 / 1 === -1. Actual: ' + (-1 / 1));
}

//CHECK#4
if (-1 / -1 !== 1) {
  $ERROR('#4: -1 / -1 === 1. Actual: ' + (-1 / -1));
}

