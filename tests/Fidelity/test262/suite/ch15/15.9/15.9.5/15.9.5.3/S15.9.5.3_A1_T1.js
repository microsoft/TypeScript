// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "toDateString" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.3/S15.9.5.3_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.toDateString;
if(x === 1)
  Date.prototype.toDateString = 2;
else
  Date.prototype.toDateString = 1;
if (Date.prototype.toDateString === x) {
  $ERROR('#1: The Date.prototype.toDateString has not the attribute ReadOnly');
}


