// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date property "prototype" has { DontEnum, DontDelete, ReadOnly } attributes
 *
 * @path ch15/15.9/15.9.4/15.9.4.1/S15.9.4.1_A1_T2.js
 * @description Checking DontDelete attribute
 */

if (delete Date.prototype !== false) {
  $ERROR('#1: The Date.prototype property has the attributes DontDelete');
}

if (!Date.hasOwnProperty('prototype')) {
  $FAIL('#2: The Date.prototype property has the attributes DontDelete');
}


