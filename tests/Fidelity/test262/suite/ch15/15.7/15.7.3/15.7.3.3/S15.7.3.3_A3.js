// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.MIN_VALUE is DontDelete
 *
 * @path ch15/15.7/15.7.3/15.7.3.3/S15.7.3.3_A3.js
 * @description Checking if deleting Number.MIN_VALUE fails
 * @noStrict
 */

//CHECK#1
if (delete Number.MIN_VALUE !== false) {
  $ERROR('#1: delete Number.MIN_VALUE === false');
}

