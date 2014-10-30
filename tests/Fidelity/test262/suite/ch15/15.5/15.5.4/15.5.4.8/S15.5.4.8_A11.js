// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the lastIndexOf method is 1
 *
 * @path ch15/15.5/15.5.4/15.5.4.8/S15.5.4.8_A11.js
 * @description Checking String.prototype.lastIndexOf.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.lastIndexOf.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.lastIndexOf.hasOwnProperty("length") return true. Actual: '+String.prototype.lastIndexOf.hasOwnProperty("length"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.lastIndexOf.length !== 1) {
  $ERROR('#2: String.prototype.lastIndexOf.length === 1. Actual: '+String.prototype.lastIndexOf.length );
}
//
//////////////////////////////////////////////////////////////////////////////

