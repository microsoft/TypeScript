// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a floating-point multiplication is governed by the rules of IEEE 754 double-precision arithmetics
 *
 * @path ch11/11.5/11.5.1/S11.5.1_A4_T4.js
 * @description Multiplication of an infinity by an infinity results in an infinity of appropriate sign
 */

//CHECK#1
if (Number.NEGATIVE_INFINITY * Number.NEGATIVE_INFINITY !== Number.POSITIVE_INFINITY) {
  $ERROR('#1: -Infinity * -Infinity === Infinity. Actual: ' + (-Infinity * -Infinity));
}

//CHECK#2
if (Number.POSITIVE_INFINITY * Number.POSITIVE_INFINITY !== Number.POSITIVE_INFINITY) {
  $ERROR('#2: Infinity * Infinity === Infinity. Actual: ' + (Infinity * Infinity));
}

//CHECK#3
if (Number.NEGATIVE_INFINITY * Number.POSITIVE_INFINITY !== Number.NEGATIVE_INFINITY) {
  $ERROR('#3: -Infinity * Infinity === -Infinity. Actual: ' + (-Infinity * Infinity));
}

//CHECK#4
if (Number.POSITIVE_INFINITY * Number.NEGATIVE_INFINITY !== Number.NEGATIVE_INFINITY) {
  $ERROR('#4: Infinity * -Infinity === -Infinity. Actual: ' + (Infinity * -Infinity));
}

