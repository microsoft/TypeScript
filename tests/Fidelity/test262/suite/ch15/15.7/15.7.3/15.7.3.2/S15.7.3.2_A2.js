// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.MAX_VALUE is ReadOnly
 *
 * @path ch15/15.7/15.7.3/15.7.3.2/S15.7.3.2_A2.js
 * @description Checking if varying Number.MAX_VALUE fails
 */

// CHECK#1
var x = Number.MAX_VALUE;
Number.MAX_VALUE = 1;
if (Number.MAX_VALUE !== x) {
  $ERROR('#1: x = Number.MAX_VALUE; Number.MAX_VALUE = 1; Number.MAX_VALUE === x');
}

