// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the split method is 2
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A11.js
 * @description Checking String.prototype.split.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.split.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.split.hasOwnProperty("length") return true. Actual: '+String.prototype.split.hasOwnProperty("length"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.split.length !== 2) {
  $ERROR('#2: String.prototype.split.length === 2. Actual: '+String.prototype.split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

