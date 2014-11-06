// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of concat has the attribute ReadOnly
 *
 * @path ch15/15.4/15.4.4/15.4.4.4/S15.4.4.4_A4.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
var x = Array.prototype.concat.length;
Array.prototype.concat.length = Infinity;
if (Array.prototype.concat.length !== x) {
  $ERROR('#1: x = Array.prototype.concat.length; Array.prototype.concat.length = Infinity; Array.prototype.concat.length === x. Actual: ' + (Array.prototype.concat.length));
}


