// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The MV of StrUnsignedDecimalLiteral::: Infinity is 10<sup><small>10000</small></sup>
 * (a value so large that it will round to <b><tt>+&infin;</tt></b>)
 *
 * @path ch09/9.3/9.3.1/S9.3.1_A6_T1.js
 * @description Compare Number('Infinity') with Number.POSITIVE_INFINITY, 10e10000, 10E10000 and Number("10e10000")
 */

// CHECK#1
if (Number("Infinity") !== Number.POSITIVE_INFINITY) {
  $ERROR('#1: Number("Infinity") === Number.POSITIVE_INFINITY');
}

// CHECK#2
if (Number("Infinity") !== 10e10000) {
  $ERROR('#2: Number("Infinity") === 10e10000');
}

// CHECK#3
if (Number("Infinity") !== 10E10000) {
  $ERROR('#3: Number("Infinity") === 10E10000');
}

// CHECK#4
if (Number("Infinity") !== Number("10e10000")) {
  $ERROR('#4: Number("Infinity") === Number("10e10000")');
}

