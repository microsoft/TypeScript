// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.slice (start, end) can be applied to object instances
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A3_T2.js
 * @description Apply String.prototype.slice to Object instance, use other value for start and end values
 */

var __instance = new Object();

__instance.slice = String.prototype.slice;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.slice(8,__instance.toString().length) !== "Object]") {
  $ERROR('#1: __instance = new Object(); __instance.slice = String.prototype.slice; __instance.slice(8,__instance.toString().length) === "Object]". Actual: '+__instance.slice(8,__instance.toString().length) );
}
//
//////////////////////////////////////////////////////////////////////////////

