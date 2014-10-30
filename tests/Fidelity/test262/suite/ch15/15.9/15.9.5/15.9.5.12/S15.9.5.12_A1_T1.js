// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getMonth" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.12/S15.9.5.12_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.getMonth;
if(x === 1)
  Date.prototype.getMonth = 2;
else
  Date.prototype.getMonth = 1;
if (Date.prototype.getMonth === x) {
  $ERROR('#1: The Date.prototype.getMonth has not the attribute ReadOnly');
}


