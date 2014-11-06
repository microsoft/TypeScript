// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toString() returns this string value
 *
 * @path ch15/15.5/15.5.4/S15.5.4.2_A1_T4.js
 * @description Create new String(function(){}()) and check it`s method toString()
 */

var __string__obj = new String(function(){}());

//////////////////////////////////////////////////////////////////////////////
//CHECK#
if (__string__obj.toString() !== "undefined") {
  $ERROR('#1: __string__obj = new String(function(){}()); __string__obj.toString() === "undefined". Actual: __string__obj.toString() ==='+__string__obj.toString() ); 
}
//
//////////////////////////////////////////////////////////////////////////////

