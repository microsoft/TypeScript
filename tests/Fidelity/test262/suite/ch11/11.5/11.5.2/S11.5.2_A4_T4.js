// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of division is determined by the specification of IEEE 754 arithmetics
 *
 * @path ch11/11.5/11.5.2/S11.5.2_A4_T4.js
 * @description Division of an infinity by an infinity results in NaN
 */

//CHECK#1
if (isNaN(Number.NEGATIVE_INFINITY / Number.NEGATIVE_INFINITY) !== true) {
  $ERROR('#1: -Infinity / -Infinity === Not-a-Number. Actual: ' + (-Infinity / -Infinity));
}

//CHECK#2
if (isNaN(Number.POSITIVE_INFINITY / Number.POSITIVE_INFINITY) !== true) {
  $ERROR('#2: Infinity / Infinity === Not-a-Number. Actual: ' + (Infinity / Infinity));
}

//CHECK#3
if (isNaN(Number.NEGATIVE_INFINITY / Number.POSITIVE_INFINITY) !== true) {
  $ERROR('#3: -Infinity / Infinity === Not-a-Number. Actual: ' + (-Infinity / Infinity));
}

//CHECK#4
if (isNaN(Number.POSITIVE_INFINITY / Number.NEGATIVE_INFINITY) !== true) {
  $ERROR('#4: Infinity / -Infinity === Not-a-Number. Actual: ' + (Infinity / -Infinity));
}

