// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.NaN is ReadOnly
 *
 * @path ch15/15.7/15.7.3/15.7.3.4/S15.7.3.4_A2.js
 * @description Checking if varying Number.NaN fails
 */

// CHECK#1
Number.NaN = 1;
if (isNaN(Number.NaN) !== true) {
  $ERROR('#1: Number.NaN = 1; Number.NaN === Not-a-Number');
}

