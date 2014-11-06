// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The result of a ECMAScript floating-point remainder operation is determined by the rules of IEEE arithmetics
 *
 * @path ch11/11.5/11.5.3/S11.5.3_A4_T4.js
 * @description If the divisor is zero results is NaN
 */

//CHECK#1
if (isNaN(-0 % 0) !== true) {
  $ERROR('#1: -0 % 0 === Not-a-Number. Actual: ' + (-0 % 0));
}

//CHECK#2
if (isNaN(-0 % -0) !== true) {
  $ERROR('#2: -0 % -0 === Not-a-Number. Actual: ' + (-0 % -0));
}

//CHECK#3
if (isNaN(0 % 0) !== true) {
  $ERROR('#3: 0 % 0 === Not-a-Number. Actual: ' + (0 % 0));
}

//CHECK#4
if (isNaN(0 % -0) !== true) {
  $ERROR('#4: 0 % -0 === Not-a-Number. Actual: ' + (0 % -0));
}

//CHECK#5
if (isNaN(-1 % 0) !== true) {
  $ERROR('#5: 1 % 0 === Not-a-Number. Actual: ' + (1 % 0));
}

//CHECK#6
if (isNaN(-1 % -0) !== true) {
  $ERROR('#6: -1 % -0 === Not-a-Number. Actual: ' + (-1 % -0));
}

//CHECK#7
if (isNaN(1 % 0) !== true) {
  $ERROR('#7: 1 % 0 === Not-a-Number. Actual: ' + (1 % 0));
}

//CHECK#8
if (isNaN(1 % -0) !== true) {
  $ERROR('#8: 1 % -0 === Not-a-Number. Actual: ' + (1 % -0));
}

//CHECK#9
if (isNaN(Number.NEGATIVE_INFINITY % 0) !== true) {
  $ERROR('#9: Infinity % 0 === Not-a-Number. Actual: ' + (Infinity % 0));
}

//CHECK#10
if (isNaN(Number.NEGATIVE_INFINITY % -0) !== true) {
  $ERROR('#10: -Infinity % -0 === Not-a-Number. Actual: ' + (-Infinity % -0));
}

//CHECK#11
if (isNaN(Number.POSITIVE_INFINITY % 0) !== true) {
  $ERROR('#11: Infinity % 0 === Not-a-Number. Actual: ' + (Infinity % 0));
}

//CHECK#12
if (isNaN(Number.POSITIVE_INFINITY % -0) !== true) {
  $ERROR('#12: Infinity % -0 === Not-a-Number. Actual: ' + (Infinity % -0));
}

//CHECK#13
if (isNaN(Number.MIN_VALUE % 0) !== true) {
  $ERROR('#13: Number.MIN_VALUE % 0 === Not-a-Number. Actual: ' + (Number.MIN_VALUE % 0));
}

//CHECK#14
if (isNaN(Number.MIN_VALUE % -0) !== true) {
  $ERROR('#14: -Number.MIN_VALUE % -0 === Not-a-Number. Actual: ' + (-Number.MIN_VALUE % -0));
}

//CHECK#15
if (isNaN(Number.MAX_VALUE % 0) !== true) {
  $ERROR('#15: Number.MAX_VALUE % 0 === Not-a-Number. Actual: ' + (Number.MAX_VALUE % 0));
}

//CHECK#16
if (isNaN(Number.MAX_VALUE % -0) !== true) {
  $ERROR('#16: Number.MAX_VALUE % -0 === Not-a-Number. Actual: ' + (Number.MAX_VALUE % -0));
}

