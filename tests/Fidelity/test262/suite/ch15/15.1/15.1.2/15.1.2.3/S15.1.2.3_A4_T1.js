// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Compute the longest prefix of Result(2), which might be Result(2) itself,
 * which satisfies the syntax of a StrDecimalLiteral
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A4_T1.js
 * @description Some wrong number
 */

//CHECK#1
if (parseFloat("0x") !== 0) {
  $ERROR('#1: parseFloat("0x") === 0. Actual: ' + (parseFloat("0x")));
}

//CHECK#2
if (parseFloat("11x") !== 11) {
  $ERROR('#2: parseFloat("11x") === 11. Actual: ' + (parseFloat("11x")));
}

//CHECK#3
if (parseFloat("11s1") !== 11) {
  $ERROR('#3: parseFloat("11s1") === 11. Actual: ' + (parseFloat("11s1")));
}

//CHECK#4
if (parseFloat("11.s1") !== 11) {
  $ERROR('#4: parseFloat("11.s1") === 11. Actual: ' + (parseFloat("11.s1")));
}

//CHECK#5
if (parseFloat(".0s1") !== 0) {
  $ERROR('#5: parseFloat(".0s1") === 0. Actual: ' + (parseFloat(".0s1")));
}

//CHECK#6
if (parseFloat("1.s1") !== 1) {
  $ERROR('#6: parseFloat("1.s1") === 1. Actual: ' + (parseFloat("1.s1")));
}

//CHECK#7
if (parseFloat("1..1") !== 1) {
  $ERROR('#7: parseFloat("1..1") === 1. Actual: ' + (parseFloat("1..1")));
}

//CHECK#8
if (parseFloat("0.1.1") !== 0.1) {
  $ERROR('#8: parseFloat("0.1.1") === 0.1. Actual: ' + (parseFloat("0.1.1")));
}

//CHECK#9
if (parseFloat("0. 1") !== 0) {
  $ERROR('#9: parseFloat("0. 1") === 0. Actual: ' + (parseFloat("0. 1")));
}

