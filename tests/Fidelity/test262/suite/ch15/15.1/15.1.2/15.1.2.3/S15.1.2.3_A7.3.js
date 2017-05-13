// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of parseFloat has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A7.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
var x = parseFloat.length;
parseFloat.length = Infinity;
if (parseFloat.length !== x) {
  $ERROR('#1: x = parseFloat.length; parseFloat.length = Infinity; parseFloat.length === x. Actual: ' + (parseFloat.length));
}


