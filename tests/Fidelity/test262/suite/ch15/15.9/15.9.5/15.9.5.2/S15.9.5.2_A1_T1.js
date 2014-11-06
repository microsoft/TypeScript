// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "toString" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.2/S15.9.5.2_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.toString;
if(x === 1)
  Date.prototype.toString = 2;
else
  Date.prototype.toString = 1;
if (Date.prototype.toString === x) {
  $ERROR('#1: The Date.prototype.toString has not the attribute ReadOnly');
}


