// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.NaN is DontDelete
 *
 * @path ch15/15.7/15.7.3/15.7.3.4/S15.7.3.4_A3.js
 * @description Checking if deleting Number.NaN fails
 * @noStrict
 */

// CHECK#1
if (delete Number.NaN !== false) {
  $ERROR('#1: delete Number.NaN === false');
}

