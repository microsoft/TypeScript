// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Object.prototype.isPrototypeOf can't be used as a constructor
 *
 * @path ch15/15.2/15.2.4/15.2.4.6/S15.2.4.6_A7.js
 * @description Checking if creating new "Object.prototype.isPrototypeOf" fails
 */

var FACTORY = Object.prototype.isPrototypeOf;

try {
  instance = new FACTORY;
  $FAIL('#1: Object.prototype.isPrototypeOf can\'t be used as a constructor');
} catch (e) {
  $PRINT(e);

}

