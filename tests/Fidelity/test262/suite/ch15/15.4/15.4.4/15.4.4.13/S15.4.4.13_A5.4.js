// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of unshift is 1
 *
 * @path ch15/15.4/15.4.4/15.4.4.13/S15.4.4.13_A5.4.js
 * @description unshift.length === 1
 */

//CHECK#1
if (Array.prototype.unshift.length !== 1) {
  $ERROR('#1: Array.prototype.unshift.length === 1. Actual: ' + (Array.prototype.unshift.length));
}


