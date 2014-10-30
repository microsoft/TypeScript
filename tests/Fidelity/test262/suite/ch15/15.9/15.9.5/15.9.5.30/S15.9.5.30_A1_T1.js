// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "setSeconds" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.30/S15.9.5.30_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.setSeconds;
if(x === 1)
  Date.prototype.setSeconds = 2;
else
  Date.prototype.setSeconds = 1;
if (Date.prototype.setSeconds === x) {
  $ERROR('#1: The Date.prototype.setSeconds has not the attribute ReadOnly');
}


