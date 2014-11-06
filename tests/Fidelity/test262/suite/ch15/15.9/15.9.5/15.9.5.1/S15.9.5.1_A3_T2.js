// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.constructor property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.1/S15.9.5.1_A3_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype.constructor.length  !== false) {
  $ERROR('#1: The Date.prototype.constructor.length property has the attributes DontDelete');
}

if (!Date.prototype.constructor.hasOwnProperty('length')) {
  $FAIL('#2: The Date.prototype.constructor.length property has the attributes DontDelete');
}


