// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of parseFloat is 1
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A7.4.js
 * @description parseFloat.length === 1
 */

//CHECK#1
if (parseFloat.length !== 1) {
  $ERROR('#1: parseFloat.length === 1. Actual: ' + (parseFloat.length));
} 


