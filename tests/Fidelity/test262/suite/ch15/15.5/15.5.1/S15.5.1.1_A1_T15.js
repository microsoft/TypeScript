// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When String is called as a function rather than as a constructor, it performs a type conversion
 *
 * @path ch15/15.5/15.5.1/S15.5.1.1_A1_T15.js
 * @description Call String(string_object)
 */

var __obj__str = "caps";

//__obj__str.prop=1;

var __str = String(__obj__str);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__str !== __obj__str) {
  $ERROR('#1: __obj__str = "caps"; __str = String(__obj__str); __str === __obj__str. Actual: __str ==='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

