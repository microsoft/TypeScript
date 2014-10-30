// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * isFinite applies ToNumber to its argument, then return false if the result is NaN, +Infinity, -Infinity, and otherwise return true
 *
 * @path ch15/15.1/15.1.2/15.1.2.5/S15.1.2.5_A1_T2.js
 * @description Checking all object
 */

// CHECK#1
if (!(isFinite({}) === false)) {
  $ERROR('#1: {} === Not-a-Finite. Actual: ' + ({})); 
}

// CHECK#2
if (!(isFinite(new String("string")) === false)) {
  $ERROR('#2: new String("string") === Not-a-Finite. Actual: ' + (new String("string"))); 
}

// CHECK#3
if (isFinite(new String("1")) === false) {
  $ERROR('#3: new String("1") === Not-a-Finite. Actual: ' + (new String("1"))); 
}

// CHECK#4
if (isFinite(new Number(1)) === false) {
  $ERROR('#4: new Number(1) !== Not-a-Finite'); 
}

// CHECK#5
if (!(isFinite(new Number(NaN)) === false)) {
  $ERROR('#5: new Number(NaN) === Not-a-Finite. Actual: ' + (new Number(NaN))); 
}

// CHECK#6
if (isFinite(new Boolean(true)) === false) {
  $ERROR('#6: new Boolean(true) !== Not-a-Finite'); 
}

