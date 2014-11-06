// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of decodeURIComponent is 1
 *
 * @path ch15/15.1/15.1.3/15.1.3.2/S15.1.3.2_A5.4.js
 * @description decodeURIComponent.length === 1
 */

//CHECK#1
if (decodeURIComponent.length !== 1) {
  $ERROR('#1: decodeURIComponent.length === 1. Actual: ' + (decodeURIComponent.length));
} 


