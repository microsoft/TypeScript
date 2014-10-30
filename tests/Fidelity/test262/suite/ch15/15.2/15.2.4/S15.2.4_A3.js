// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since the Object prototype object is not a function, it has not [[call]] method
 *
 * @path ch15/15.2/15.2.4/S15.2.4_A3.js
 * @description Checking if calling Object prototype as a function fails
 */

//CHECK#1
try {
  Object.prototype();
  $FAIL('#1: Since Object prototype object is not function it has not [[call]] method');
} catch (e) {
  $PRINT(e);
}

