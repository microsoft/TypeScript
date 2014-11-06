// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.toLocaleTimeString property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.7/S15.9.5.7_A3_T1.js
 * @description Checking ReadOnly attribute
 */

x = Date.prototype.toLocaleTimeString.length;
Date.prototype.toLocaleTimeString.length = 1;
if (Date.prototype.toLocaleTimeString.length !== x) {
  $ERROR('#1: The Date.prototype.toLocaleTimeString.length has the attribute ReadOnly');
}


