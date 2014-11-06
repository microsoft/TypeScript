// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the toLocaleLowerCase method is 0
 *
 * @path ch15/15.5/15.5.4/15.5.4.17/S15.5.4.17_A11.js
 * @description Checking String.prototype.toLocaleLowerCase.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.toLocaleLowerCase.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.toLocaleLowerCase.hasOwnProperty("length") return true. Actual: '+String.prototype.toLocaleLowerCase.hasOwnProperty("length"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.toLocaleLowerCase.length !== 0) {
  $ERROR('#2: String.prototype.toLocaleLowerCase.length === 0. Actual: '+String.prototype.toLocaleLowerCase.length );
}
//
//////////////////////////////////////////////////////////////////////////////

