// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.valueOf() returns this string value
 *
 * @path ch15/15.5/15.5.4/S15.5.4.3_A1_T4.js
 * @description Create String object as new String(function(){}()) and check it`s valueOf()
 */

var __string__obj = new String(function(){}());

//////////////////////////////////////////////////////////////////////////////
//CHECK#
if (__string__obj.valueOf() !== "undefined") {
  $ERROR('#1: __string__obj = new String(function(){}()); __string__obj.valueOf() === "undefined". Actual: __string__obj.valueOf() ==='+__string__obj.valueOf() ); 
}
//
//////////////////////////////////////////////////////////////////////////////

