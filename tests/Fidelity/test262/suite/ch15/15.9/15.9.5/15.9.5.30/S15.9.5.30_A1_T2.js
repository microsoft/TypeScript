// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "setSeconds" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.30/S15.9.5.30_A1_T2.js
 * @description Checking absence of DontDelete attribute
 */

if (delete Date.prototype.setSeconds  === false) {
  $ERROR('#1: The Date.prototype.setSeconds property has not the attributes DontDelete');
}

if (Date.prototype.hasOwnProperty('setSeconds')) {
  $FAIL('#2: The Date.prototype.setSeconds property has not the attributes DontDelete');
}


