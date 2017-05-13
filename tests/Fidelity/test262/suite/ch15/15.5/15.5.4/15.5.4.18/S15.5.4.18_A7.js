// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase can't be used as constructor
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A7.js
 * @description Checking if creating the String.prototype.toUpperCase object fails
 */

var __FACTORY = String.prototype.toUpperCase;

try {
  var __instance = new __FACTORY;
  $FAIL('#1: var __FACTORY = String.prototype.toUpperCase; "__instance = new __FACTORY" lead to throwing exception');
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.1: var __FACTORY = String.prototype.toUpperCase; "__instance = new __FACTORY" throw a TypeError. Actual: ' + (e));  
  }
}

