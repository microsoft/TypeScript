// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The isNaN property has not prototype property
 *
 * @path ch15/15.1/15.1.2/15.1.2.4/S15.1.2.4_A2.6.js
 * @description Checking isNaN.prototype
 */

//CHECK#1
if (isNaN.prototype !== undefined) {
  $ERROR('#1: isNaN.prototype === undefined. Actual: ' + (isNaN.prototype));
}

