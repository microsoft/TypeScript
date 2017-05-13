// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the slice method is 2
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A11.js
 * @description Checking String.prototype.slice.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.slice.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.slice.hasOwnProperty("length") return true. Actual: '+String.prototype.slice.hasOwnProperty("length"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.slice.length !== 2) {
  $ERROR('#2: String.prototype.slice.length === 2. Actual: '+String.prototype.slice.length );
}
//
//////////////////////////////////////////////////////////////////////////////

