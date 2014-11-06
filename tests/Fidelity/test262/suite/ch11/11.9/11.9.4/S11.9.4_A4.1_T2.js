// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x or y is NaN, return false
 *
 * @path ch11/11.9/11.9.4/S11.9.4_A4.1_T2.js
 * @description y is NaN
 */

//CHECK#1
if (true === Number.NaN) {
  $ERROR('#1: true !== NaN');
}

//CHECK#2
if (-1 === Number.NaN) {
  $ERROR('#2: -1 !== NaN');
}

//CHECK#3
if (Number.NaN === Number.NaN) {
  $ERROR('#3: NaN !== NaN');
}

//CHECK#4
if (Number.POSITIVE_INFINITY === Number.NaN) {
  $ERROR('#4: +Infinity !== NaN');
}

//CHECK#5
if (Number.NEGATIVE_INFINITY === Number.NaN) {
  $ERROR('#5: -Infinity !== NaN');
}

//CHECK#6
if (Number.MAX_VALUE === Number.NaN) {
  $ERROR('#6: Number.MAX_VALUE !== NaN');
}

//CHECK#7
if (Number.MIN_VALUE === Number.NaN) {
  $ERROR('#7: Number.MIN_VALUE !== NaN');
}

//CHECK#8
if ("string" === Number.NaN) {
  $ERROR('#8: "string" !== NaN');
}

//CHECK#9
if (new Object() === Number.NaN) {
  $ERROR('#9: new Object() !== NaN');
}

