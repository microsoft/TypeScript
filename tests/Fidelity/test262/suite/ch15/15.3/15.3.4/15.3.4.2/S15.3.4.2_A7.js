// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Function.prototype.toString can't be used as constructor
 *
 * @path ch15/15.3/15.3.4/15.3.4.2/S15.3.4.2_A7.js
 * @description Checking if creating "new Function.prototype.toString" fails
 */

var FACTORY = Function.prototype.toString;

try {
  var instance = new FACTORY;
  $FAIL('#1: Function.prototype.toString can\'t be used as constructor');
} catch (e) {
  $PRINT(e);
}

