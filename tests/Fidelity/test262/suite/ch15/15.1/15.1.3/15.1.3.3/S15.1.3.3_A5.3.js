// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of encodeURI has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.3/15.1.3.3/S15.1.3.3_A5.3.js
 * @description Checking if varying the length property fails
 */

//CHECK#1
x = encodeURI.length;
encodeURI.length = Infinity;
if (encodeURI.length !== x) {
  $ERROR('#1: x = encodeURI.length; encodeURI.length = Infinity; encodeURI.length === x. Actual: ' + (encodeURI.length));
}


