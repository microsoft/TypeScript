// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When String is called as a function rather than as a constructor, it performs a type conversion
 *
 * @path ch15/15.5/15.5.1/S15.5.1.1_A1_T8.js
 * @description Call String(new Array)
 */

var __old__Array__prototype__toString = Array.prototype.toString;

Array.prototype.toString=function(){return "__ARRAY__";};

var __str = String(new Array);

// restore old toString method just in case
Array.prototype.toString=__old__Array__prototype__toString;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __str !== "string") {
  $ERROR('#1: __str = String(new Array); typeof __str === "string". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str !== "__ARRAY__") {
  $ERROR('#2: Array.prototype.toString=function(){return "__ARRAY__";}; __str = String(new Array); __str === "__ARRAY__". Actual: __str ==='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

