// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x - y produces the same result as x + (-y)
 *
 * @path ch11/11.6/11.6.2/S11.6.2_A4_T2.js
 * @description The difference of two infinities of opposite sign is the infinity of minuend sign
 */

//CHECK#1
if (Number.POSITIVE_INFINITY - Number.NEGATIVE_INFINITY !== Number.POSITIVE_INFINITY ) {
  $ERROR('#1: Infinity - -Infinity === Infinity. Actual: ' + (Infinity - -Infinity));
}

//CHECK#2
if (Number.NEGATIVE_INFINITY - Number.POSITIVE_INFINITY !== Number.NEGATIVE_INFINITY ) {
  $ERROR('#2: -Infinity - Infinity === -Infinity. Actual: ' + (-Infinity - Infinity));
}




