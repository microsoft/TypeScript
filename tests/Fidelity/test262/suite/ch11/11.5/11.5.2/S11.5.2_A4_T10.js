// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of division is determined by the specification of IEEE 754 arithmetics
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A4_T10.js
 * @description If both operands are finite and nonzero, the quotient is computed and rounded using IEEE 754 round-to-nearest mode.
 * If the magnitude is too small to represent, the result is then a zero of appropriate sign
 */

//CHECK#1
if (Number.MIN_VALUE / 2.1 !== 0) {
  $ERROR('#1: Number.MIN_VALUE / 2.1 === 0. Actual: ' + (Number.MIN_VALUE / 2.1));
}

//CHECK#2
if (Number.MIN_VALUE / -2.1 !== -0) {
  $ERROR('#2.1: Number.MIN_VALUE / -2.1 === 0. Actual: ' + (Number.MIN_VALUE / -2.1));
} else {
  if (1 / (Number.MIN_VALUE / -2.1) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#2.2: Number.MIN_VALUE / -2.1 === -0. Actual: +0');
  }
}

//CHECK#3
if (Number.MIN_VALUE / 2.0 !== 0) {
  $ERROR('#3: Number.MIN_VALUE / 2.0 === 0. Actual: ' + (Number.MIN_VALUE / 2.0));
}

//CHECK#4
if (Number.MIN_VALUE / -2.0 !== -0) {
  $ERROR('#4.1: Number.MIN_VALUE / -2.0 === -0. Actual: ' + (Number.MIN_VALUE / -2.0));
} else {
  if (1 / (Number.MIN_VALUE / -2.0) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#4.2: Number.MIN_VALUE / -2.0 === -0. Actual: +0');
  }
}

//CHECK#5
if (Number.MIN_VALUE / 1.9 !== Number.MIN_VALUE) {
  $ERROR('#5: Number.MIN_VALUE / 1.9 === Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE / 1.9));
}

//CHECK#6
if (Number.MIN_VALUE / -1.9 !== -Number.MIN_VALUE) {
  $ERROR('#6: Number.MIN_VALUE / -1.9 === -Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE / -1.9));
}

//CHECK#7
if (Number.MIN_VALUE / 1.1 !== Number.MIN_VALUE) {
  $ERROR('#7: Number.MIN_VALUE / 1.1 === Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE / 1.1));
}

//CHECK#8
if (Number.MIN_VALUE / -1.1 !== -Number.MIN_VALUE) {
  $ERROR('#8: Number.MIN_VALUE / -1.1 === -Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE / -1.1));
} 

