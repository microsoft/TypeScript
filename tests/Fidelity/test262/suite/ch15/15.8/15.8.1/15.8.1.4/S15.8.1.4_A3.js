// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property LOG2E of the Math Object has the attribute DontDelete
 *
 * @path ch15/15.8/15.8.1/15.8.1.4/S15.8.1.4_A3.js
 * @description Checking if Math.LOG2E property has the attribute DontDelete
 * @noStrict
 */

// CHECK#1
if (delete Math.LOG2E === true) {
    $ERROR('#1: Value Property LOG2E of the Math Object hasn\'t attribute DontDelete: \'Math.LOG2E === true\'');
}


