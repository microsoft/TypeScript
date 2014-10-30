// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "valueOf" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.8/S15.9.5.8_A1_T2.js
 * @description Checking absence of DontDelete attribute
 */

if (delete Date.prototype.valueOf  === false) {
  $ERROR('#1: The Date.prototype.valueOf property has not the attributes DontDelete');
}

if (Date.prototype.hasOwnProperty('valueOf')) {
  $FAIL('#2: The Date.prototype.valueOf property has not the attributes DontDelete');
}


