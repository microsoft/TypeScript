// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setMinutes property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.32/S15.9.5.32_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.setMinutes.length  !== false) {
  $ERROR('#1: The Date.prototype.setMinutes.length property has the attributes DontDelete');
}

if (!Date.prototype.setMinutes.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.setMinutes.length property has the attributes DontDelete');
}


