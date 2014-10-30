// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A1_T1.js
 * @description Arguments are false and true, and instance is object
 */

var __instance = new Object(true);

__instance.substring = String.prototype.substring;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.substring(false, true) !== "t") {
  $ERROR('#1: __instance = new Object(true); __instance.substring = String.prototype.substring;  __instance.substring(false, true) === "t". Actual: '+__instance.substring(false, true) );
}
//
//////////////////////////////////////////////////////////////////////////////

