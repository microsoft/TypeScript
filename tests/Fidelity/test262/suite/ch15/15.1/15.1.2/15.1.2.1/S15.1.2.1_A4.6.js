// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The eval property has not prototype property
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A4.6.js
 * @description Checking eval.prototype
 */

//CHECK#1
if (eval.prototype !== undefined) {
  $ERROR('#1: eval.prototype === undefined. Actual: ' + (eval.prototype));
}

