// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A1_T2.js
 * @description Arguments are function call and x, and instance is Boolean. x is undefined variable
 */

var __instance = new Boolean;

__instance.substring = String.prototype.substring;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.substring(function(){return true;}(),x) !== "alse") {
  $ERROR('#1: var x; __instance = new Boolean; __instance.substring = String.prototype.substring;  __instance.substring(function(){return true;}(),x) === "alse". Actual: '+__instance.substring(function(){return true;}(),x) );
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

