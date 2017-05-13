// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getUTCSeconds property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.23/S15.9.5.23_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.getUTCSeconds.length  !== false) {
  $ERROR('#1: The Date.prototype.getUTCSeconds.length property has the attributes DontDelete');
}

if (!Date.prototype.getUTCSeconds.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.getUTCSeconds.length property has the attributes DontDelete');
}


