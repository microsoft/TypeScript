// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLowerCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.16/S15.5.4.16_A1_T2.js
 * @description Instance is Boolean object
 */

__instance = new Boolean;

__instance.toLowerCase = String.prototype.toLowerCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.toLowerCase() !== "false") {
  $ERROR('#1: __instance = new Boolean; __instance.toLowerCase = String.prototype.toLowerCase;  __instance.toLowerCase() === "false". Actual: '+__instance.toLowerCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

