// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of concat is 1
 *
 * @path ch15/15.4/15.4.4/15.4.4.4/S15.4.4.4_A4.4.js
 * @description concat.length === 1
 */

//CHECK#1
if (Array.prototype.concat.length !== 1) {
  $ERROR('#1: Array.prototype.concat.length === 1. Actual: ' + (Array.prototype.concat.length));
}


