// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.slice (start, end) can be applied to object instances
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A3_T1.js
 * @description Apply String.prototype.slice to Object instance
 */

var __instance = new Object();

__instance.slice = String.prototype.slice;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.slice(0,8) !== "[object ") {
  $ERROR('#1: __instance = new Object(); __instance.slice = String.prototype.slice; __instance.slice(0,8) === "[object ". Actual: '+__instance.slice(0,8) );
}
//
//////////////////////////////////////////////////////////////////////////////

