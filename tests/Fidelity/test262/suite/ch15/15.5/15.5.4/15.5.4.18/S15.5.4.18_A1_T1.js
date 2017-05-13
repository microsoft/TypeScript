// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A1_T1.js
 * @description Arguments is true, and instance is object
 */

var __instance = new Object(true);

__instance.toUpperCase = String.prototype.toUpperCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.toUpperCase() !== "TRUE") {
  $ERROR('#1: __instance = new Object(true); __instance.toUpperCase = String.prototype.toUpperCase;  __instance.toUpperCase() === "TRUE". Actual: '+__instance.toUpperCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

