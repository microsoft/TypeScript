// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charAt(pos)
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A1_T9.js
 * @description Call charAt() function with function(){}() argument of string object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToInteger(undefined) evaluates to 0 charAt() evaluates to charAt(0)
if (new String(42).charAt(function(){}()) !== "4") {
  $ERROR('#1: new String(42).charAt(function(){}()) === "4". Actual: new String(42).charAt(function(){}()) ==='+new String(42).charAt(function(){}()) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

