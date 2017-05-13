// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a floating-point multiplication is governed by the rules of IEEE 754 double-precision arithmetics
 *
 * @path ch11/11.5/11.5.1/S11.5.1_A4_T5.js
 * @description Multiplication of an infinity by a finite non-zero value results in a signed infinity
 */

//CHECK#1
if (Number.NEGATIVE_INFINITY * -1 !== Number.POSITIVE_INFINITY) {
  $ERROR('#1: -Infinity * -1 === Infinity. Actual: ' + (-Infinity * -1));
}

//CHECK#2
if (-1 * Number.NEGATIVE_INFINITY !== Number.POSITIVE_INFINITY) {
  $ERROR('#2: -1 * -Infinity === Infinity. Actual: ' + (-1 * -Infinity));
}

//CHECK#3
if (Number.POSITIVE_INFINITY * -1 !== Number.NEGATIVE_INFINITY) {
  $ERROR('#3: Infinity * -1 === -Infinity. Actual: ' + (Infinity * -1));
}

//CHECK#4
if (-1 * Number.POSITIVE_INFINITY !== Number.NEGATIVE_INFINITY) {
  $ERROR('#4: -1 * Infinity === -Infinity. Actual: ' + (-1 * Infinity));
}  

//CHECK#5
if (Number.POSITIVE_INFINITY * Number.MAX_VALUE !== Number.POSITIVE_INFINITY) {
  $ERROR('#5: Infinity * Number.MAX_VALUE === Infinity. Actual: ' + (Infinity * Number.MAX_VALUE));
}

//CHECK#6
if (Number.POSITIVE_INFINITY * Number.MAX_VALUE !== Number.MAX_VALUE * Number.POSITIVE_INFINITY) {
  $ERROR('#6: Infinity * Number.MAX_VALUE === Number.MAX_VALUE * Infinity. Actual: ' + (Infinity * Number.MAX_VALUE));
}

//CHECK#7
if (Number.NEGATIVE_INFINITY * Number.MIN_VALUE !== Number.NEGATIVE_INFINITY) {
  $ERROR('#7: -Infinity * Number.MIN_VALUE === -Infinity. Actual: ' + (-Infinity * Number.MIN_VALUE));
}

//CHECK#8
if (Number.NEGATIVE_INFINITY * Number.MIN_VALUE !== Number.MIN_VALUE * Number.NEGATIVE_INFINITY) {
  $ERROR('#8: -Infinity * Number.MIN_VALUE === Number.MIN_VALUE * -Infinity. Actual: ' + (-Infinity * Number.MIN_VALUE));
}  

