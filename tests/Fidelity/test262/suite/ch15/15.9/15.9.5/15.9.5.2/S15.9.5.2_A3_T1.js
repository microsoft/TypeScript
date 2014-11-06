// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.toString property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.2/S15.9.5.2_A3_T1.js
 * @description Checking ReadOnly attribute
 */

x = Date.prototype.toString.length;
Date.prototype.toString.length = 1;
if (Date.prototype.toString.length !== x) {
  $ERROR('#1: The Date.prototype.toString.length has the attribute ReadOnly');
}


