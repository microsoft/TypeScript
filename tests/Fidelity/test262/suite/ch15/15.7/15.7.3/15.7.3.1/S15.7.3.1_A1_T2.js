// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Number property "prototype" has { DontEnum, DontDelete, ReadOnly } attributes
 *
 * @path ch15/15.7/15.7.3/15.7.3.1/S15.7.3.1_A1_T2.js
 * @description Checking if deleting the Number.prototype property fails
 * @noStrict
 */

// CHECK#1
if (delete Number.prototype !== false) {
  $ERROR('#1: The Number.prototype property has the attributes DontDelete');
}

if (!Number.hasOwnProperty('prototype')) {
  $FAIL('#2: The Number.prototype property has the attributes DontDelete');
}

