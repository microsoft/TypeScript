// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end) returns a string value(not object)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A2_T10.js
 * @description start is 0, end is 8
 */

var __string = new String("this_is_a_string object");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__string.substring(0,8) !== "this_is_") {
  $ERROR('#1: __string = new String("this_is_a_string object"); __string.substring(0,8) === "this_is_". Actual: '+__string.substring(0,8) );
}
//
//////////////////////////////////////////////////////////////////////////////

