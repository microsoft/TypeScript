// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCMonth" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.13/S15.9.5.13_A1_T2.js
 * @description Checking absence of DontDelete attribute
 */

if (delete Date.prototype.getUTCMonth  === false) {
  $ERROR('#1: The Date.prototype.getUTCMonth property has not the attributes DontDelete');
}

if (Date.prototype.hasOwnProperty('getUTCMonth')) {
  $FAIL('#2: The Date.prototype.getUTCMonth property has not the attributes DontDelete');
}


