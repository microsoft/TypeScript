// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When String.prototype.charAt(pos) calls if ToInteger(pos) not less than ToString(this value) the empty string returns
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A3.js
 * @description pos is bigger of string length
 */

var __instance = new String("ABC");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.charAt(3) !== "") {
  $ERROR('#1: __instance = new String("ABC"); __instance.charAt(3) === "". Actual: __instance.charAt(3) ==='+__instance.charAt(3) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

