// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.toLocaleTimeString property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.7/S15.9.5.7_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.toLocaleTimeString.length  !== false) {
  $ERROR('#1: The Date.prototype.toLocaleTimeString.length property has the attributes DontDelete');
}

if (!Date.prototype.toLocaleTimeString.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.toLocaleTimeString.length property has the attributes DontDelete');
}


