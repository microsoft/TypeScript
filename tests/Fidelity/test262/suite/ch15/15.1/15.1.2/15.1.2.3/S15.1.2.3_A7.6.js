// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The parseFloat property has not prototype property
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A7.6.js
 * @description Checking parseFloat.prototype
 */

//CHECK#1
if (parseFloat.prototype !== undefined) {
  $ERROR('#1: parseFloat.prototype === undefined. Actual: ' + (parseFloat.prototype));
}

