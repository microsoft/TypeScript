// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getFullYear" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.10/S15.9.5.10_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.getFullYear;
if(x === 1)
  Date.prototype.getFullYear = 2;
else
  Date.prototype.getFullYear = 1;
if (Date.prototype.getFullYear === x) {
  $ERROR('#1: The Date.prototype.getFullYear has not the attribute ReadOnly');
}


