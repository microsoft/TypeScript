// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property LOG10E of the Math Object has the attribute ReadOnly
 *
 * @path ch15/15.8/15.8.1/15.8.1.5/S15.8.1.5_A4.js
 * @description Checking if Math.LOG10E property has the attribute ReadOnly
 * @noStrict
 */

// CHECK#1
var x = Math.LOG10E;
Math.LOG10E = 1;
if (Math.LOG10E !== x) {
  $ERROR('#1: Math.LOG10E hasn\'t ReadOnly: \'x = Math.LOG10E;Math.LOG10E = 1;Math.LOG10E === x\'');
}

