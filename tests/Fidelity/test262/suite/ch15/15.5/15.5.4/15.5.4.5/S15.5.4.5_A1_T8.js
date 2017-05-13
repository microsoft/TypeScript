// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charCodeAt(pos)
 *
 * @path ch15/15.5/15.5.4/15.5.4.5/S15.5.4.5_A1_T8.js
 * @description Call charCodeAt() function with void 0 argument of string object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToInteger(void 0) evaluates to 0 charCodeAt() evaluates to charCodeAt(0)
if (String(42).charCodeAt(void 0) !== 0x34) {
  $ERROR('#1: String(42).charCodeAt(void 0) === 0x34. Actual: String(42).charCodeAt(void 0) ==='+String(42).charCodeAt(void 0) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

