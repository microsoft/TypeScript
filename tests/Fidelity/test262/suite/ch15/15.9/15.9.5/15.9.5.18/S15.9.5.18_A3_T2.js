// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getHours property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.18/S15.9.5.18_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.getHours.length  !== false) {
  $ERROR('#1: The Date.prototype.getHours.length property has the attributes DontDelete');
}

if (!Date.prototype.getHours.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.getHours.length property has the attributes DontDelete');
}


