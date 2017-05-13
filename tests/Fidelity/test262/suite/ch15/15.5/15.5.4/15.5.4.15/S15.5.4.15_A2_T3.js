// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end) returns a string value(not object)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A2_T3.js
 * @description Call substring from empty String object
 */

var __string = new String("");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__string.substring(1,0) !== "") {
  $ERROR('#1: __string = new String(""); __string.substring(1,0) === "". Actual: '+__string.substring(1,0) );
}
//
//////////////////////////////////////////////////////////////////////////////

