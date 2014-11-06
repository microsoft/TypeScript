// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of an addition is determined using the rules of IEEE 754 double-precision arithmetics
 *
 * @path ch11/11.6/11.6.1/S11.6.1_A4_T8.js
 * @description If the magnitude is too large to represent, the operation overflows and the result is then an infinity of appropriate sign
 */

//CHECK#1
if (Number.MAX_VALUE + Number.MAX_VALUE !== Number.POSITIVE_INFINITY) {
  $ERROR('#1: Number.MAX_VALUE + Number.MAX_VALUE === Number.POSITIVE_INFINITY. Actual: ' + (Number.MAX_VALUE + Number.MAX_VALUE));
}

//CHECK#2
if (-Number.MAX_VALUE - Number.MAX_VALUE !== Number.NEGATIVE_INFINITY) {
  $ERROR('#2: -Number.MAX_VALUE - Number.MAX_VALUE === Number.NEGATIVE_INFINITY. Actual: ' + (-Number.MAX_VALUE - Number.MAX_VALUE));
}

//CHECK#3
if (1e+308 + 1e+308 !== Number.POSITIVE_INFINITY) {
  $ERROR('#3: 1e+308 + 1e+308 === Number.POSITIVE_INFINITY. Actual: ' + (1e+308 + 1e+308));
}

//CHECK#4
if (-8.99e+307 - 8.99e+307 !== Number.NEGATIVE_INFINITY) {
  $ERROR('#4: -8.99e+307 - 8.99e+307 === Number.NEGATIVE_INFINITY. Actual: ' + (-8.99e+307 - 8.99e+307));
}

