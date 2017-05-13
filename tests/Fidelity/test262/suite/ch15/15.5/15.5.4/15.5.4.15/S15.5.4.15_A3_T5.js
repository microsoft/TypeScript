// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end) can be applied to non String object instance and
 * returns a string value(not object)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A3_T5.js
 * @description Apply String.prototype.substring to Object instance. Start is 8, end is 0
 */

var __instance = new Object(); 
__instance.substring = String.prototype.substring;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.substring(8,0) !== "[object ") {
  $ERROR('#1: __instance = new Object(); __instance.substring = String.prototype.substring; __instance.substring(8,0) === "[object ". Actual: '+__instance.substring(8,0) );
}
//
//////////////////////////////////////////////////////////////////////////////

