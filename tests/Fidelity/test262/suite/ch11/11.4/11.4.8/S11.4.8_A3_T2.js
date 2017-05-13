// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator ~x returns ~ToInt32(x)
 *
 * @path ch11/11.4/11.4.8/S11.4.8_A3_T2.js
 * @description Type(x) is number primitive or Number object
 */

//CHECK#1
if (~0.1 !== -1) {
  $ERROR('#1: ~0.1 === -1. Actual: ' + (~0.1));
}

//CHECK#2
if (~new Number(-0.1) !== -1) {
  $ERROR('#2: ~new Number(-0.1) === -1. Actual: ' + (~new Number(-0.1)));
}

//CHECK#3
if (~NaN !== -1) {
  $ERROR('#3: ~NaN === -1. Actual: ' + (~NaN));
}

//CHECK#4
if (~new Number(NaN) !== -1) {
  $ERROR('#4: ~new Number(NaN) === -1. Actual: ' + (~new Number(NaN)));
}

//CHECK#5
if (~1 !== -2) {
  $ERROR('#5: ~1 === -2. Actual: ' + (~1));
}

//CHECK#6
if (~new Number(-2) !== 1) {
  $ERROR('#6: ~new Number(-2) === 1. Actual: ' + (~new Number(-2)));
}

//CHECK#7
if (~Infinity !== -1) {
  $ERROR('#7: ~Infinity === -1. Actual: ' + (~Infinity));
}

