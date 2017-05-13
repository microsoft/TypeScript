// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a floating-point multiplication is governed by the rules of IEEE 754 double-precision arithmetics
 *
 * @path ch11/11.5/11.5.1/S11.5.1_A4_T7.js
 * @description If the magnitude is too small to represent, the result is then a zero of appropriate sign
 */

//CHECK#1
if (Number.MIN_VALUE * 0.1 !== 0) {
  $ERROR('#1: Number.MIN_VALUE * 0.1 === 0. Actual: ' + (Number.MIN_VALUE * 0.1));
}

//CHECK#2
if (-0.1 * Number.MIN_VALUE !== -0) {
  $ERROR('#2.1: -0.1 * Number.MIN_VALUE === -0. Actual: ' + (-0.1 * Number.MIN_VALUE));
} else {
  if (1 / (-0.1 * Number.MIN_VALUE) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#2.2: -0.1 * Number.MIN_VALUE === -0. Actual: +0');
  }
}

//CHECK#3
if (Number.MIN_VALUE * 0.5 !== 0) {
  $ERROR('#3: Number.MIN_VALUE * 0.5 === 0. Actual: ' + (Number.MIN_VALUE * 0.5));
}

//CHECK#4
if (-0.5 * Number.MIN_VALUE !== -0) {
  $ERROR('#4.1: -0.5 * Number.MIN_VALUE === -0. Actual: ' + (-0.5 * Number.MIN_VALUE));
} else {
  if (1 / (-0.5 * Number.MIN_VALUE) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#4.2: -0.5 * Number.MIN_VALUE === -0. Actual: +0');
  }
}

//CHECK#5
if (Number.MIN_VALUE * 0.51 !== Number.MIN_VALUE) {
  $ERROR('#5: Number.MIN_VALUE * 0.51 === Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE * 0.51));
}

//CHECK#6
if (-0.51 * Number.MIN_VALUE !== -Number.MIN_VALUE) {
  $ERROR('#6: -0.51 * Number.MIN_VALUE === -Number.MIN_VALUE. Actual: ' + (-0.51 * Number.MIN_VALUE));
}

//CHECK#7
if (Number.MIN_VALUE * 0.9 !== Number.MIN_VALUE) {
  $ERROR('#7: Number.MIN_VALUE * 0.9 === Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE * 0.9));
}

//CHECK#8
if (-0.9 * Number.MIN_VALUE !== -Number.MIN_VALUE) {
  $ERROR('#8: -0.9 * Number.MIN_VALUE === -Number.MIN_VALUE. Actual: ' + (-0.9 * Number.MIN_VALUE));
} 

