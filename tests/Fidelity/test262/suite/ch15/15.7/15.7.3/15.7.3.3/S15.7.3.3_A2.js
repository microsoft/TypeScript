// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.MIN_VALUE is ReadOnly
 *
 * @path ch15/15.7/15.7.3/15.7.3.3/S15.7.3.3_A2.js
 * @description Checking if varying Number.MIN_VALUE fails
 */

// CHECK#1
var x = Number.MIN_VALUE;
Number.MIN_VALUE = 1;
if (Number.MIN_VALUE !== x) {
  $ERROR('#1: x = Number.MIN_VALUE; Number.MIN_VALUE = 1; Number.MIN_VALUE === x');
}

