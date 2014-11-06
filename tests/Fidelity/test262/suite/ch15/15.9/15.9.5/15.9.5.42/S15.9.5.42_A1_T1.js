// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "toUTCString" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.42/S15.9.5.42_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.toUTCString;
if(x === 1)
  Date.prototype.toUTCString = 2;
else
  Date.prototype.toUTCString = 1;
if (Date.prototype.toUTCString === x) {
  $ERROR('#1: The Date.prototype.toUTCString has not the attribute ReadOnly');
}


