// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A1_T6.js
 * @description Call toUpperCase() function of Number.NEGATIVE_INFINITY
 */

Number.prototype.toUpperCase = String.prototype.toUpperCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ((Number.NEGATIVE_INFINITY).toUpperCase() !== "-INFINITY") {
  $ERROR('#1: Number.prototype.toUpperCase = String.prototype.toUpperCase; (Number.NEGATIVE_INFINITY).toUpperCase() === "-INFINITY". Actual: '+(Number.NEGATIVE_INFINITY).toUpperCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

