// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When String.prototype.charAt(pos) calls if ToInteger(pos) less than 0 the empty string returns
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A2.js
 * @description Call charAt(pos) with negative pos
 */

function __FACTORY(){};

__FACTORY.prototype.charAt = String.prototype.charAt;

var __instance = new __FACTORY;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__instance.charAt(-1) !== "") {
  $ERROR('#1: __instance.charAt(-1) === "". Actual: __instance.charAt(-1) ==='+__instance.charAt(-1) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

