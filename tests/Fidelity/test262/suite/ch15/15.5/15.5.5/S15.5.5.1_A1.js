// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * length property contains the number of characters in the String value represented by this String object
 *
 * @path ch15/15.5/15.5.5/S15.5.5.1_A1.js
 * @description Create strings and check its length
 */

var __str__instance = new String("ABC\u0041\u0042\u0043");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__str__instance.length !== 6) {
  $ERROR('#1: var __str__instance = new String("ABC\\u0041\\u0042\\u0043"); __str__instance.length === 6, where __str__instance is new String("ABC\\u0041\\u0042\\u0043"). Actual: __str__instance.length ==='+__str__instance.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

__str__instance = new String;

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str__instance.length !== 0) {
  $ERROR('#2: __str__instance = new String; __str__instance.length === 0, where __str__instance is new String. Actual: __str__instance.length ==='+__str__instance.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

