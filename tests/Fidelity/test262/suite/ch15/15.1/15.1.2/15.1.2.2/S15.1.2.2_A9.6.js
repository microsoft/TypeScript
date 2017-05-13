// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The parseInt property has not prototype property
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A9.6.js
 * @description Checking parseInt.prototype
 */

//CHECK#1
if (parseInt.prototype !== undefined) {
  $ERROR('#1: parseInt.prototype === undefined. Actual: ' + (parseInt.prototype));
}

