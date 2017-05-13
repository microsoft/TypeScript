// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.slice can't be used as constructor
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A7.js
 * @description Checking if creating the String.prototype.slice object fails
 */

var __FACTORY = String.prototype.slice;

try {
  var __instance = new __FACTORY;
  $FAIL('#1: __FACTORY = String.prototype.slice; "__instance = new __FACTORY" lead to throwing exception');
} catch (e) {
  $PRINT(e);
}

