// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.concat([,[...]])
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A1_T1.js
 * @description Arguments are false and true, and instance is object
 */

var __instance = new Object(42);

__instance.concat = String.prototype.concat;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.concat(false,true) !== "42falsetrue") {
  $ERROR('#1: __instance = new Object(42); __instance.concat = String.prototype.concat;  __instance.concat(false,true) === "42falsetrue". Actual: '+__instance.concat(false,true) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

