// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.19/S15.5.4.19_A1_T7.js
 * @description Call toLocaleUpperCase() function of NaN
 */

Number.prototype.toLocaleUpperCase = String.prototype.toLocaleUpperCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (NaN.toLocaleUpperCase()!== "NAN") {
  $ERROR('#1: Number.prototype.toLocaleUpperCase = String.prototype.toLocaleUpperCase; NaN.toLocaleUpperCase()=== "NAN". Actual: '+NaN.toLocaleUpperCase());
}
//
//////////////////////////////////////////////////////////////////////////////

