// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setUTCSeconds property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.31/S15.9.5.31_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.setUTCSeconds.length  !== false) {
  $ERROR('#1: The Date.prototype.setUTCSeconds.length property has the attributes DontDelete');
}

if (!Date.prototype.setUTCSeconds.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.setUTCSeconds.length property has the attributes DontDelete');
}


