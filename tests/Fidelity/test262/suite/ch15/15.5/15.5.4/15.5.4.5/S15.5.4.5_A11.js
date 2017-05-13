// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the charCodeAt method is 1
 *
 * @path ch15/15.5/15.5.4/15.5.4.5/S15.5.4.5_A11.js
 * @description Checking String.prototype.charCodeAt.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.charCodeAt.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.charCodeAt.hasOwnProperty("length") return true. Actual: '+String.prototype.charCodeAt.hasOwnProperty("length")); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.charCodeAt.length !== 1) {
  $ERROR('#2: String.prototype.charCodeAt.length === 1. Actual: '+String.prototype.charCodeAt.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

