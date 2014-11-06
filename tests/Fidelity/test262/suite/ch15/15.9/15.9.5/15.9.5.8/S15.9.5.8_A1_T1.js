// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "valueOf" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.8/S15.9.5.8_A1_T1.js
 * @description Checking absence of ReadOnly attribute
 */

x = Date.prototype.valueOf;
if(x === 1)
  Date.prototype.valueOf = 2;
else
  Date.prototype.valueOf = 1;
if (Date.prototype.valueOf === x) {
  $ERROR('#1: The Date.prototype.valueOf has not the attribute ReadOnly');
}


