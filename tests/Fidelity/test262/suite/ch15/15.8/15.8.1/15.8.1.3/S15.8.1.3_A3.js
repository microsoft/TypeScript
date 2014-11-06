// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property LN2 of the Math Object has the attribute DontDelete
 *
 * @path ch15/15.8/15.8.1/15.8.1.3/S15.8.1.3_A3.js
 * @description Checking if Math.LN2 property has the attribute DontDelete
 * @noStrict
 */

// CHECK#1
if (delete Math.LN2 === true) {
    $ERROR('#1: Value Property LN2 of the Math Object hasn\'t attribute DontDelete: \'Math.LN2 === true\'');
}


