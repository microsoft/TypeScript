// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "setFullYear" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.40/S15.9.5.40_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.setFullYear;
if(x === 1)
  Date.prototype.setFullYear = 2;
else
  Date.prototype.setFullYear = 1;
if (Date.prototype.setFullYear === x) {
  $ERROR('#1: The Date.prototype.setFullYear has not the attribute ReadOnly');
}


