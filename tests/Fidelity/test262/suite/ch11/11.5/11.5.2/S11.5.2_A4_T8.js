// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of division is determined by the specification of IEEE 754 arithmetics
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A4_T8.js
 * @description Division of a zero by any non-zero finite value -0 results in zero of appropriate sign
 */

//CHECK#1
if (-0 / 1 !== -0) {
  $ERROR('#1.1: -0 / 1 === 0. Actual: ' + (-0 / 1));
} else {
  if (1 / (-0 / 1) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#1.2: -0 / 1 === - 0. Actual: +0');
  }
}

//CHECK#2
if (-0 / -1 !== +0) {
  $ERROR('#2.1: -0 / -1 === 0. Actual: ' + (-0 / -1));
} else {
  if (1 / (-0 / -1) !== Number.POSITIVE_INFINITY) {
    $ERROR('#2.2: -0 / -1 === + 0. Actual: -0');
  }
}

//CHECK#3
if (+0 / 1 !== +0) {
  $ERROR('#3.1: +0 / 1 === 0. Actual: ' + (+0 / 1));
} else {
  if (1 / (+0 / -1) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#3.2: +0 / -1 === + 0. Actual: -0');
  }
}

//CHECK#4
if (+0 / -1 !== -0) {
  $ERROR('#4.1: +0 / -1 === 0. Actual: ' + (+0 / -1));
} else {
  if (1 / (+0 / -1) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#4.2: +0 / -1 === - 0. Actual: +0');
  }
}

//CHECK#5
if (+0 / -Number.MAX_VALUE !== -0) {
  $ERROR('#5.1: 0 / -Number.MAX_VALUE === 0. Actual: ' + (0 / -Number.MAX_VALUE));
} else {
  if (1 / (+0 / -Number.MAX_VALUE) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#5.2: +0 / -Number.MAX_VALUE === - 0. Actual: +0');
  }
}

//CHECK#6
if (-0 / Number.MIN_VALUE !== -0) {
  $ERROR('#6.1: -0 / Number.MIN_VALUE === 0. Actual: ' + (-0 / Number.MIN_VALUE));
} else {
  if (1 / (-0 / Number.MIN_VALUE) !== Number.NEGATIVE_INFINITY) {
    $ERROR('#6.2: -0 / Number.MIN_VALUE === - 0. Actual: +0');
  }
}

