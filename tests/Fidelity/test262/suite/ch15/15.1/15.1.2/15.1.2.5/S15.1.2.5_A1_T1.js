// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * isFinite applies ToNumber to its argument, then return false if the result is NaN, +Infinity, -Infinity, and otherwise return true
 *
 * @path ch15/15.1/15.1.2/15.1.2.5/S15.1.2.5_A1_T1.js
 * @description Checking all primitive
 */

// CHECK#1
if (!(isFinite(NaN) === false)) {
  $ERROR('#1: NaN === Not-a-Finite. Actual: ' + (NaN)); 
}

// CHECK#2
if (!(isFinite(Number.NaN) === false)) {
  $ERROR('#2: Number.NaN === Not-a-Finite. Actual: ' + (Number.NaN)); 
}

// CHECK#3
if (!(isFinite(Number(void 0)) === false)) {
  $ERROR('#3: Number(void 0) === Not-a-Finite. Actual: ' + (Number(void 0))); 
}

// CHECK#4
if (!(isFinite(void 0) === false)) {
  $ERROR('#4: void 0 === Not-a-Finite. Actual: ' + (void 0)); 
}

// CHECK#5
if (!(isFinite("string") === false)) {
  $ERROR('#5: "string" === Not-a-Finite. Actual: ' + ("string")); 
}

// CHECK#6
if (isFinite(Number.POSITIVE_INFINITY) !== false) {
  $ERROR('#6: Number.POSITIVE_INFINITY === Not-a-Finite. Actual: ' + (Number.POSITIVE_INFINITY)); 
}

// CHECK#7
if (isFinite(Number.NEGATIVE_INFINITY) !== false) {
  $ERROR('#7: Number.NEGATIVE_INFINITY === Not-a-Finite. Actual: ' + (Number.NEGATIVE_INFINITY)); 
}

// CHECK#8
if (isFinite(Number.MAX_VALUE) === false) {
  $ERROR('#8: Number.MAX_VALUE !== Not-a-Finite'); 
}

// CHECK#9
if (isFinite(Number.MIN_VALUE) === false) {
  $ERROR('#9: Number.MIN_VALUE !== Not-a-Finite'); 
}

// CHECK#10
if (isFinite(-0) === false) {
  $ERROR('#10: -0 !== Not-a-Finite'); 
}

// CHECK#11
if (isFinite(false) === false) {
  $ERROR('#11: false !== Not-a-Finite'); 
}

// CHECK#12
if (isFinite("1") === false) {
  $ERROR('#12: "1" !== Not-a-Finite'); 
}

