// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The slice property of Array has not prototype property
 *
 * @path ch15/15.4/15.4.4/15.4.4.10/S15.4.4.10_A5.6.js
 * @description Checking Array.prototype.slice.prototype
 */

//CHECK#1
if (Array.prototype.slice.prototype !== undefined) {
  $ERROR('#1: Array.prototype.slice.prototype === undefined. Actual: ' + (Array.prototype.slice.prototype));
}

