// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property E of the Math Object has the attribute ReadOnly
 *
 * @path ch15/15.8/15.8.1/15.8.1.1/S15.8.1.1_A4.js
 * @description Checking if Math.E property has the attribute ReadOnly
 * @noStrict
 */

// CHECK#1
var x = Math.E;
Math.E = 1;
if (Math.E !== x) {
  $ERROR('#1: Math.E hasn\'t ReadOnly: \'x = Math.E;Math.E = 1;Math.E === x\'');
}

