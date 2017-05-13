// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.MAX_VALUE is DontDelete
 *
 * @path ch15/15.7/15.7.3/15.7.3.2/S15.7.3.2_A3.js
 * @description Checking if deleting Number.MAX_VALUE fails
 * @noStrict
 */

// CHECK#1
if (delete Number.MAX_VALUE !== false) {
  $ERROR('#1: delete Number.MAX_VALUE === false');
}

