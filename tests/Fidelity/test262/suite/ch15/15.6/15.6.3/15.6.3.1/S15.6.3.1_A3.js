// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Boolean.prototype has the attribute DontDelete
 *
 * @path ch15/15.6/15.6.3/15.6.3.1/S15.6.3.1_A3.js
 * @description Checking if deleting the Boolean.prototype property fails
 */

// CHECK#1
if (delete Boolean.prototype !== false) {
  $ERROR('#1: Boolean.prototype has the attribute DontDelete');
}

