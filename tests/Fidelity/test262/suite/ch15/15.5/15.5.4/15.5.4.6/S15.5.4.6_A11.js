// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the concat method is 1
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A11.js
 * @description Checking String.prototype.concat.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.concat.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.concat.hasOwnProperty("length") return true. Actual: '+String.prototype.concat.hasOwnProperty("length")); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.concat.length !== 1) {
  $ERROR('#2: String.prototype.concat.length === 1. Actual: '+String.prototype.concat.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

