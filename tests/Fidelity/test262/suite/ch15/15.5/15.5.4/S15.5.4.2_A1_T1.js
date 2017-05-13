// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toString() returns this string value
 *
 * @path ch15/15.5/15.5.4/S15.5.4.2_A1_T1.js
 * @description Create new String(number) and check it`s method toString()
 */

var __string__obj = new String(1);

//////////////////////////////////////////////////////////////////////////////
//CHECK#
if (__string__obj.toString() !== ""+1) {
  $ERROR('#1: __string__obj = new String(1); __string__obj.toString() === ""+1. Actual: __string__obj.toString() ==='+__string__obj.toString() ); 
}
//
//////////////////////////////////////////////////////////////////////////////

