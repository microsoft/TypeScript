// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The sort property of Array has not prototype property
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A7.6.js
 * @description Checking Array.prototype.sort.prototype
 */

//CHECK#1
if (Array.prototype.sort.prototype !== undefined) {
  $ERROR('#1: Array.prototype.sort.prototype === undefined. Actual: ' + (Array.prototype.sort.prototype));
}

