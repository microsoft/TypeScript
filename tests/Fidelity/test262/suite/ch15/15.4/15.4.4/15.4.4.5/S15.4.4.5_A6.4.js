// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of join is 1
 *
 * @path ch15/15.4/15.4.4/15.4.4.5/S15.4.4.5_A6.4.js
 * @description join.length === 1
 */

//CHECK#1
if (Array.prototype.join.length !== 1) {
  $ERROR('#1: Array.prototype.join.length === 1. Actual: ' + (Array.prototype.join.length));
}


