// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setTime property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.27/S15.9.5.27_A3_T1.js
 * @description Checking ReadOnly attribute
 */

x = Date.prototype.setTime.length;
Date.prototype.setTime.length = 1;
if (Date.prototype.setTime.length !== x) {
  $ERROR('#1: The Date.prototype.setTime.length has the attribute ReadOnly');
}


