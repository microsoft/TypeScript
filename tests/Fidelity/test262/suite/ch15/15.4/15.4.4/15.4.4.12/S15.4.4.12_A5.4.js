// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of splice is 2
 *
 * @path ch15/15.4/15.4.4/15.4.4.12/S15.4.4.12_A5.4.js
 * @description splice.length === 1
 */

//CHECK#1
if (Array.prototype.splice.length !== 2) {
  $ERROR('#1: Array.prototype.splice.length === 2. Actual: ' + (Array.prototype.splice.length));
}


