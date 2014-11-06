// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of Array is 1
 *
 * @path ch15/15.4/15.4.3/S15.4.3_A2.4.js
 * @description Array.length === 1
 */

//CHECK#1
if (Array.length !== 1) {
  $ERROR('#1: Array.length === 1. Actual: ' + (Array.length));
}


