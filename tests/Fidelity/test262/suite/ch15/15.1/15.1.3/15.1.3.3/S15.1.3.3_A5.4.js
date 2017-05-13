// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of encodeURI is 1
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A5.4.js
 * @description encodeURI.length === 1
 */

//CHECK#1
if (encodeURI.length !== 1) {
  $ERROR('#1: encodeURI.length === 1. Actual: ' + (encodeURI.length));
} 


