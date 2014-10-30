// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Compute the longest prefix of Result(2), which might be Result(2) itself,
 * which satisfies the syntax of a StrDecimalLiteral
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A4_T4.js
 * @description "Infinity"+"some string"
 */

//CHECK#1
if (parseFloat("Infinity1") !== Number.POSITIVE_INFINITY) {
  $ERROR('#1: parseFloat("Infinity1") === Number.POSITIVE_INFINITY. Actual: ' + (parseFloat("Infinity1")));
}

//CHECK#2
if (parseFloat("Infinityx") !== Number.POSITIVE_INFINITY) {
  $ERROR('#2: parseFloat("Infinityx") === Number.POSITIVE_INFINITY. Actual: ' + (parseFloat("Infinityx")));
}

//CHECK#3
if (parseFloat("Infinity+1") !== Number.POSITIVE_INFINITY) {
  $ERROR('#3: parseFloat("Infinity+1") === Number.POSITIVE_INFINITY. Actual: ' + (parseFloat("Infinity+1")));
}

