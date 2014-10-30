// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of decodeURI is 1
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A5.4.js
 * @description decodeURI.length === 1
 */

//CHECK#1
if (decodeURI.length !== 1) {
  $ERROR('#1: decodeURI.length === 1. Actual: ' + (decodeURI.length));
} 


