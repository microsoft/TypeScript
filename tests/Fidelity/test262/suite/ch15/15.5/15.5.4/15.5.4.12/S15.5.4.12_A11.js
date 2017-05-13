// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the search method is 1
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A11.js
 * @description Checking String.prototype.search.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.search.hasOwnProperty("length"))) {
  $ERROR('#1: String.prototype.search.hasOwnProperty("length") return true. Actual: '+String.prototype.search.hasOwnProperty("length"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.search.length !== 1) {
  $ERROR('#2: String.prototype.search.length === 1. Actual: '+String.prototype.search.length );
}
//
//////////////////////////////////////////////////////////////////////////////

