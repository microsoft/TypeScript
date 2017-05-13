// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a ECMAScript floating-point remainder operation is determined by the rules of IEEE arithmetics
 *
 * @path ch11/11.5/11.5.3/S11.5.3_A4_T5.js
 * @description If dividend is finite and the divisor is an infinity, the result equals the dividend
 */

//CHECK#1
if (1 % Number.NEGATIVE_INFINITY !== 1) {
  $ERROR('#1: 1 % -Infinity === 1. Actual: ' + (1 % -Infinity));
}
//CHECK#2
if (1 % Number.POSITIVE_INFINITY !==1) {
  $ERROR('#2: 1 % Infinity === 1. Actual: ' + (1 % Infinity));
}

//CHECK#3
if (-1 % Number.POSITIVE_INFINITY !== -1) {
  $ERROR('#3: -1 % Infinity === -1. Actual: ' + (-1 % Infinity));
}

//CHECK#4
if (-1 % Number.NEGATIVE_INFINITY !== -1) {
  $ERROR('#4: -1 % -Infinity === -1. Actual: ' + (-1 % -Infinity));
}

//CHECK#5
if (0 % Number.POSITIVE_INFINITY !== 0) {
  $ERROR('#5.1: 0 % Infinity === 0. Actual: ' + (0 % Infinity));
} else {
  if (1 / (0 % Number.POSITIVE_INFINITY) !== Number.POSITIVE_INFINITY) {
    $ERROR('#5.2: 0 % Infinity === + 0. Actual: -0');
  }
}

//CHECK#6
if (0 % Number.NEGATIVE_INFINITY !== 0) {
  $ERROR('#6.1: 0 % -Infinity === 0. Actual: ' + (0 % -Infinity));
} else {
  if (1 / (0 %  Number.NEGATIVE_INFINITY) !== Number.POSITIVE_INFINITY) {
    $ERROR('#6.2: 0 % -Infinity === + 0. Actual: -0');
  }
}

//CHECK#7
if (-0 % Number.POSITIVE_INFINITY !== -0) {
  $ERROR('#7.1: -0 % Infinity === 0. Actual: ' + (-0 % Infinity));
} else {
  if (1 / (-0 % Number.POSITIVE_INFINITY) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#7.2: -0 % Infinity === - 0. Actual: +0');
  }
}

//CHECK#8
if (-0 %  Number.NEGATIVE_INFINITY !== -0) {
  $ERROR('#8.1: -0 % -Infinity === 0. Actual: ' + (-0 % -Infinity));
} else {
  if (1 / (-0 %  Number.NEGATIVE_INFINITY) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#8.2: -0 % -Infinity === - 0. Actual: +0');
  }
}

//CHECK#9
if (Number.MAX_VALUE % Number.NEGATIVE_INFINITY !== Number.MAX_VALUE) {
  $ERROR('#9: Number.MAX_VALUE % -Infinity === Number.MAX_VALUE. Actual: ' + (Number.MAX_VALUE % -Infinity));
}

//CHECK#10
if (Number.MAX_VALUE % Number.POSITIVE_INFINITY !== Number.MAX_VALUE) {
  $ERROR('#10: Number.MAX_VALUE % Infinity === Number.MAX_VALUE. Actual: ' + (Number.MAX_VALUE % Infinity));
}

//CHECK#11
if (-Number.MAX_VALUE % Number.POSITIVE_INFINITY !== -Number.MAX_VALUE) {
  $ERROR('#11: -Number.MAX_VALUE % Infinity === -Number.MAX_VALUE. Actual: ' + (-Number.MAX_VALUE % Infinity));
}

//CHECK#12
if (-Number.MAX_VALUE % Number.NEGATIVE_INFINITY !== -Number.MAX_VALUE) {
  $ERROR('#12: -Number.MAX_VALUE % -Infinity === -Number.MAX_VALUE. Actual: ' + (-Number.MAX_VALUE % -Infinity));
}

//CHECK#13
if (Number.MIN_VALUE % Number.NEGATIVE_INFINITY !== Number.MIN_VALUE) {
  $ERROR('#13: Number.MIN_VALUE % -Infinity === Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE % -Infinity));
}
//CHECK#14
if (Number.MIN_VALUE % Number.POSITIVE_INFINITY !== Number.MIN_VALUE) {
  $ERROR('#14: Number.MIN_VALUE % Infinity === Number.MIN_VALUE. Actual: ' + (Number.MIN_VALUE % Infinity));
}

//CHECK#15
if (-Number.MIN_VALUE % Number.POSITIVE_INFINITY !== -Number.MIN_VALUE) {
  $ERROR('#15: -Number.MIN_VALUE % Infinity === -Number.MIN_VALUE. Actual: ' + (-Number.MIN_VALUE % Infinity));
}

//CHECK#16
if (-Number.MIN_VALUE % Number.NEGATIVE_INFINITY !== -Number.MIN_VALUE) {
  $ERROR('#16: -Number.MIN_VALUE % -Infinity === -Number.MIN_VALUE. Actual: ' + (-Number.MIN_VALUE % -Infinity));
}

