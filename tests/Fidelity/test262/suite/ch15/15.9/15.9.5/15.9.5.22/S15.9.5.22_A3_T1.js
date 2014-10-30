// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getSeconds property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.22/S15.9.5.22_A3_T1.js
 * @description Checking ReadOnly attribute
 */

x = Date.prototype.getSeconds.length;
Date.prototype.getSeconds.length = 1;
if (Date.prototype.getSeconds.length !== x) {
  $ERROR('#1: The Date.prototype.getSeconds.length has the attribute ReadOnly');
}


