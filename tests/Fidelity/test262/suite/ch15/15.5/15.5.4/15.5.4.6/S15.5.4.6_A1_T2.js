// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.concat([,[...]])
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A1_T2.js
 * @description Arguments are equation with false and true, and instance is Boolean object
 */

var __instance = new Boolean;

__instance.concat = String.prototype.concat;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.concat("\u0041",true,true+1) !== "falseAtrue2") {
  $ERROR('#1: __instance = new Boolean; __instance.concat = String.prototype.concat;  __instance.concat("\\u0041",true,true+1) === "falseAtrue2". Actual: '+__instance.concat("\u0041",true,true+1) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

