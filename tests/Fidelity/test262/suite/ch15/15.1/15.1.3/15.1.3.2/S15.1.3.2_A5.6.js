// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The decodeURIComponent property has not prototype property
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A5.6.js
 * @description Checking decodeURIComponent.prototype
 */

//CHECK#1
if (decodeURIComponent.prototype !== undefined) {
  $ERROR('#1: decodeURIComponent.prototype === undefined. Actual: ' + (decodeURIComponent.prototype));
}

