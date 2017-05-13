// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.toString property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.2/S15.9.5.2_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.toString.length  !== false) {
  $ERROR('#1: The Date.prototype.toString.length property has the attributes DontDelete');
}

if (!Date.prototype.toString.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.toString.length property has the attributes DontDelete');
}


