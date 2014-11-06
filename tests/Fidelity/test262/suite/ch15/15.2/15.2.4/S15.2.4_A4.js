// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since the Object prototype object is not a function, it has not [[create]] method
 *
 * @path ch15/15.2/15.2.4/S15.2.4_A4.js
 * @description Checking if creating "new Object.prototype" fails
 */

//CHECK#1
try {
  instance = new Object.prototype;
  $FAIL('#1: Since Object prototype object is not function it has not [[create]] method');
} catch (e) {
  $PRINT(e);
}

