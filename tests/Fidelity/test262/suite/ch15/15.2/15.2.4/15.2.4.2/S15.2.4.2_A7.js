// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object.prototype.toString can't be used as a constructor
 *
 * @path ch15/15.2/15.2.4/15.2.4.2/S15.2.4.2_A7.js
 * @description Checking if creating "new Object.prototype.toString" fails
 */

var FACTORY = Object.prototype.toString;

try {
  instance = new FACTORY;
  $FAIL('#1: Object.prototype.toString can\'t be used as a constructor');
} catch (e) {
  $PRINT(e);
}

