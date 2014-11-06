// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of isFinite has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.2/15.1.2.5/S15.1.2.5_A2.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
x = isFinite.length;
isFinite.length = Infinity;
if (isFinite.length !== x) {
  $ERROR('#1: x = isFinite.length; isFinite.length = Infinity; isFinite.length === x. Actual: ' + (isFinite.length));
}


