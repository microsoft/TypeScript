// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getDay property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.16/S15.9.5.16_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.getDay.length  !== false) {
  $ERROR('#1: The Date.prototype.getDay.length property has the attributes DontDelete');
}

if (!Date.prototype.getDay.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.getDay.length property has the attributes DontDelete');
}


