// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of parseInt has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A9.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
x = parseInt.length;
parseInt.length = Infinity;
if (parseInt.length !== x) {
  $ERROR('#1: x = parseInt.length; parseInt.length = Infinity; parseInt.length === x. Actual: ' + (parseInt.length));
}


