// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCDay" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.17/S15.9.5.17_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.getUTCDay;
if(x === 1)
  Date.prototype.getUTCDay = 2;
else
  Date.prototype.getUTCDay = 1;
if (Date.prototype.getUTCDay === x) {
  $ERROR('#1: The Date.prototype.getUTCDay has not the attribute ReadOnly');
}


