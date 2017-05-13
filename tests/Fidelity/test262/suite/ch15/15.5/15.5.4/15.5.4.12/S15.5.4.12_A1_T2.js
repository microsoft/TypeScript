// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A1_T2.js
 * @description Argument is function call, and instance is Boolean
 */

var __instance = new Boolean;

__instance.search = String.prototype.search;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.search(function(){return false;}()) !== 0) {
  $ERROR('#1: __instance = new Boolean; __instance.search = String.prototype.search;  __instance.search(function(){return false;}()) === 0. Actual: '+__instance.search(function(){return false;}()) );
}
//
//////////////////////////////////////////////////////////////////////////////

