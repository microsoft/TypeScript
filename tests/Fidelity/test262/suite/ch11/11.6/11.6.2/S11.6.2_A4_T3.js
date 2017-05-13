// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator x - y produces the same result as x + (-y)
 *
 * @path ch11/11.6/11.6.2/S11.6.2_A4_T3.js
 * @description The difference of two infinities of the same sign is NaN
 */

//CHECK#1
if (isNaN(Number.POSITIVE_INFINITY - Number.POSITIVE_INFINITY) !== true ) {
  $ERROR('#1: Infinity - Infinity === Not-a-Number. Actual: ' + (Infinity - Infinity));
}

//CHECK#2
if (isNaN(Number.NEGATIVE_INFINITY - Number.NEGATIVE_INFINITY) !== true ) {
  $ERROR('#2: -Infinity - -Infinity === Not-a-Number. Actual: ' + (-Infinity - -Infinity));
}




