// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A1_T14.js
 * @description Call toUpperCase() function of RegExp object
 */

var __reg = new RegExp("abc");
__reg.toUpperCase = String.prototype.toUpperCase;
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__reg.toUpperCase() !== "/ABC/") {
  $ERROR('#1: var __reg = new RegExp("abc"); __reg.toUpperCase = String.prototype.toUpperCase; __reg.toUpperCase() === "/ABC/". Actual: '+__reg.toUpperCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

