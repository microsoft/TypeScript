// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCMilliseconds" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.25/S15.9.5.25_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.getUTCMilliseconds;
if(x === 1)
  Date.prototype.getUTCMilliseconds = 2;
else
  Date.prototype.getUTCMilliseconds = 1;
if (Date.prototype.getUTCMilliseconds === x) {
  $ERROR('#1: The Date.prototype.getUTCMilliseconds has not the attribute ReadOnly');
}


