// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charAt(pos)
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A1_T1.js
 * @description pos is false and true, and instance is object
 */

var __instance = new Object(42);

__instance.charAt = String.prototype.charAt;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.charAt(false)+__instance.charAt(true) !== "42") {
  $ERROR('#1: __instance = new Object(42); __instance.charAt = String.prototype.charAt;  __instance = new Object(42); __instance.charAt = String.prototype.charAt; __instance.charAt(false)+__instance.charAt(true) === "42". Actual: '+__instance.charAt(false)+__instance.charAt(true) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

