// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.19/S15.5.4.19_A1_T8.js
 * @description Call toLocaleUpperCase() function of Infinity
 */

Number.prototype.toLocaleUpperCase = String.prototype.toLocaleUpperCase;

if (Infinity.toLocaleUpperCase()!== "INFINITY") {
  $ERROR('#1: Number.prototype.toLocaleUpperCase = String.prototype.toLocaleUpperCase; Infinity.toLocaleUpperCase()=== "INFINITY". Actual: '+Infinity.toLocaleUpperCase());
}

