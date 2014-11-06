// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "setUTCFullYear" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.41/S15.9.5.41_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.setUTCFullYear;
if(x === 1)
  Date.prototype.setUTCFullYear = 2;
else
  Date.prototype.setUTCFullYear = 1;
if (Date.prototype.setUTCFullYear === x) {
  $ERROR('#1: The Date.prototype.setUTCFullYear has not the attribute ReadOnly');
}


