// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of push has the attribute ReadOnly
 *
 * @path ch15/15.4/15.4.4/15.4.4.7/S15.4.4.7_A6.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
var x = Array.prototype.push.length;
Array.prototype.push.length = Infinity;
if (Array.prototype.push.length !== x) {
  $ERROR('#1: x = Array.prototype.push.length; Array.prototype.push.length = Infinity; Array.prototype.push.length === x. Actual: ' + (Array.prototype.push.length));
}


