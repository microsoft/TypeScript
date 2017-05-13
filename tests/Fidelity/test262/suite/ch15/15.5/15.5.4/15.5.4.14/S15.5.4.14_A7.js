// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split can't be used as constructor
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A7.js
 * @description Checking if creating the String.prototype.split object fails
 */

var __FACTORY = String.prototype.split;

try {
  var __instance = new __FACTORY;
  $FAIL('#1: __FACTORY = String.prototype.split; "__instance = new __FACTORY" lead to throwing exception');
} catch (e) {
    if (e instanceof Test262Error) throw e;
}

