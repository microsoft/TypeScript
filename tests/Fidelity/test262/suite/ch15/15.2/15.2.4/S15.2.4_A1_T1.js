// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object prototype object has not prototype
 *
 * @path ch15/15.2/15.2.4/S15.2.4_A1_T1.js
 * @description Checking if obtaining Object.prototype.prototype fails
 */

// CHECK#1
if (Object.prototype.prototype !== undefined) {
  $ERROR('#1: Object prototype has not prototype');
}

