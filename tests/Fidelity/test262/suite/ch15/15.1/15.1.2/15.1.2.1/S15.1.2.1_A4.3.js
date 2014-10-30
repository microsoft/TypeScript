// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of eval has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A4.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
var x = eval.length;
eval.length = Infinity;
if (eval.length !== x) {
  $ERROR('#1: x = eval.length; eval.length = Infinity; eval.length === x. Actual: ' + (eval.length));
}


