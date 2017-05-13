// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of sort is 1
 *
 * @path ch15/15.4/15.4.4/15.4.4.11/S15.4.4.11_A7.4.js
 * @description sort.length === 1
 */

//CHECK#1
if (Array.prototype.sort.length !== 1) {
  $ERROR('#1: Array.prototype.sort.length === 1. Actual: ' + (Array.prototype.sort.length));
}


