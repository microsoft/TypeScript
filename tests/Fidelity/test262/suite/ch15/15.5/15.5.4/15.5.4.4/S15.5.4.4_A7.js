// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charAt can't be used as constructor
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A7.js
 * @description Checking if creating the String.prototype.charAt object fails
 */

var __FACTORY = String.prototype.charAt;

try {
  var __instance = new __FACTORY;
  $FAIL('#1: __FACTORY = String.prototype.charAt; "__instance = new __FACTORY" lead to throwing exception');
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: undefined = 1 throw a TypeError. Actual: ' + (e));  
  }
}

