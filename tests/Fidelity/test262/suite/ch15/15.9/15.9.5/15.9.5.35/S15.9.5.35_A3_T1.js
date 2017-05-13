// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setUTCHours property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.35/S15.9.5.35_A3_T1.js
 * @description Checking ReadOnly attribute
 */

x = Date.prototype.setUTCHours.length;
Date.prototype.setUTCHours.length = 1;
if (Date.prototype.setUTCHours.length !== x) {
  $ERROR('#1: The Date.prototype.setUTCHours.length has the attribute ReadOnly');
}


