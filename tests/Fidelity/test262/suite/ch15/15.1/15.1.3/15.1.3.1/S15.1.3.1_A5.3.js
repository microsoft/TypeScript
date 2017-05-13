// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of decodeURI has the attribute ReadOnly
 *
 * @path ch15/15.1/15.1.3/15.1.3.1/S15.1.3.1_A5.3.js
 * @description Checking if varying the length property fails
 * @noStrict
 */

//CHECK#1
var x = decodeURI.length;
decodeURI.length = Infinity;
if (decodeURI.length !== x) {
  $ERROR('#1: x = decodeURI.length; decodeURI.length = Infinity; decodeURI.length === x. Actual: ' + (decodeURI.length));
}


