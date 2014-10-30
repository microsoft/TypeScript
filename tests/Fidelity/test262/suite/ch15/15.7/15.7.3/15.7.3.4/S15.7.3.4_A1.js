// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.NaN is Not-a-Number
 *
 * @path ch15/15.7/15.7.3/15.7.3.4/S15.7.3.4_A1.js
 * @description Checking isNaN(Number.NaN)
 */

// CHECK#1
if (isNaN(Number.NaN) !== true) {
  $ERROR('#1: Number.NaN === Not-a-Number');
}

