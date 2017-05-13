// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getUTCDay property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.17/S15.9.5.17_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.getUTCDay.length  !== false) {
  $ERROR('#1: The Date.prototype.getUTCDay.length property has the attributes DontDelete');
}

if (!Date.prototype.getUTCDay.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.getUTCDay.length property has the attributes DontDelete');
}


