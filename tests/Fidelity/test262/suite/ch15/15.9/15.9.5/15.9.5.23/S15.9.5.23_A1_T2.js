// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCSeconds" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.23/S15.9.5.23_A1_T2.js
 * @description Checking absence of DontDelete attribute
 */

if (delete Date.prototype.getUTCSeconds  === false) {
  $ERROR('#1: The Date.prototype.getUTCSeconds property has not the attributes DontDelete');
}

if (Date.prototype.hasOwnProperty('getUTCSeconds')) {
  $FAIL('#2: The Date.prototype.getUTCSeconds property has not the attributes DontDelete');
}


