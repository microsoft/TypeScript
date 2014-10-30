// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property PI of the Math Object has the attribute ReadOnly
 *
 * @path ch15/15.8/15.8.1/15.8.1.6/S15.8.1.6_A4.js
 * @description Checking if Math.PI property has the attribute ReadOnly
 * @noStrict
 */

// CHECK#1
var x = Math.PI;
Math.PI = 1;
if (Math.PI !== x) {
  $ERROR('#1: Math.PI hasn\'t ReadOnly: \'x = Math.PI;Math.PI = 1;Math.PI === x\'');
}

