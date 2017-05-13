// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property LN2 of the Math Object has the attribute ReadOnly
 *
 * @path ch15/15.8/15.8.1/15.8.1.3/S15.8.1.3_A4.js
 * @description Checking if Math.LN2 property has the attribute DontDelete
 * @noStrict
 */

// CHECK#1
var x = Math.LN2;
Math.LN2 = 1;
if (Math.LN2 !== x) {
  $ERROR('#1: Math.LN2 hasn\'t ReadOnly: \'x = Math.LN2;Math.LN2 = 1;Math.LN2 === x\'');
}

