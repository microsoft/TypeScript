// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When String is called as a function rather than as a constructor, it performs a type conversion
 *
 * @path ch15/15.5/15.5.1/S15.5.1.1_A1_T19.js
 * @description Call String() with Array of numbers
 */

var __str = String(new Array(1,2,3));

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __str !== "string") {
  $ERROR('#1: __str = String(new Array(1,2,3)); typeof __str === "string". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str !== "1,2,3") {
  $ERROR('#2: __str = String(new Array(1,2,3)); __str === "1,2,3". Actual: __str ==='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

