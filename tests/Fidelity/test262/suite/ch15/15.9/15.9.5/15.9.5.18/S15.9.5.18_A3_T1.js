// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getHours property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.18/S15.9.5.18_A3_T1.js
 * @description Checking ReadOnly attribute
 */

x = Date.prototype.getHours.length;
Date.prototype.getHours.length = 1;
if (Date.prototype.getHours.length !== x) {
  $ERROR('#1: The Date.prototype.getHours.length has the attribute ReadOnly');
}


