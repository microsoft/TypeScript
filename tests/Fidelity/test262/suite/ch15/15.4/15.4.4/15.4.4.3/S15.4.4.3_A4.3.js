// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of toLocaleString has the attribute ReadOnly
 *
 * @path ch15/15.4/15.4.4/15.4.4.3/S15.4.4.3_A4.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
var x = Array.prototype.toLocaleString.length;
Array.prototype.toLocaleString.length = Infinity;
if (Array.prototype.toLocaleString.length !== x) {
  $ERROR('#1: x = Array.prototype.toLocaleString.length; Array.prototype.toLocaleString.length = Infinity; Array.prototype.toLocaleString.length === x. Actual: ' + (Array.prototype.toLocaleString.length));
}


