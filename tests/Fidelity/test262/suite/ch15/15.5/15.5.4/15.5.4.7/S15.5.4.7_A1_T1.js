// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.indexOf(searchString, position)
 *
 * @path ch15/15.5/15.5.4/15.5.4.7/S15.5.4.7_A1_T1.js
 * @description Arguments are false and true, and instance is object
 */

var __instance = new Object(true);

__instance.indexOf = String.prototype.indexOf;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.indexOf(true, false) !== 0) {
  $ERROR('#1: __instance = new Object(true); __instance.indexOf = String.prototype.indexOf;  __instance.indexOf(true, false) === 0. Actual: '+__instance.indexOf(true, false) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

