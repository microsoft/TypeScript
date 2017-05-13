// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp.prototype.toString can't be used as constructor
 *
 * @path ch15/15.10/15.10.6/15.10.6.4/S15.10.6.4_A7.js
 * @description Checking if creating the RegExp.prototype.toString object fails
 */

__FACTORY = RegExp.prototype.toString;

try {
	__instance = new __FACTORY;
	$ERROR('#1.1: __FACTORY = RegExp.prototype.toString throw TypeError. Actual: ' + (__instance));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: __FACTORY = RegExp.prototype.toString throw TypeError. Actual: ' + (e));
  }
}

