// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of isNaN has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.2/15.1.2.4/S15.1.2.4_A2.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
x = isNaN.length;
isNaN.length = Infinity;
if (isNaN.length !== x) {
  $ERROR('#1: x = isNaN.length; isNaN.length = Infinity; isNaN.length === x. Actual: ' + (isNaN.length));
}


