// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of isFinite is 1
 *
 * @path ch15/15.1/15.1.2/15.1.2.5/S15.1.2.5_A2.4.js
 * @description isFinite.length === 1
 */

//CHECK#1
if (isFinite.length !== 1) {
  $ERROR('#1: isFinite.length === 1. Actual: ' + (isFinite.length));
} 


