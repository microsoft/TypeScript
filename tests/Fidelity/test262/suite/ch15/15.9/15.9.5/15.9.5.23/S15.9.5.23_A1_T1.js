// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCSeconds" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.23/S15.9.5.23_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.getUTCSeconds;
if(x === 1)
  Date.prototype.getUTCSeconds = 2;
else
  Date.prototype.getUTCSeconds = 1;
if (Date.prototype.getUTCSeconds === x) {
  $ERROR('#1: The Date.prototype.getUTCSeconds has not the attribute ReadOnly');
}


