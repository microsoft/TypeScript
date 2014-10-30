// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date property "parse" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.4/15.9.4.2/S15.9.4.2_A1_T2.js
 * @description Checking absence of DontDelete attribute
 */

if (delete Date.parse  === false) {
  $ERROR('#1: The Date.parse property has not the attributes DontDelete');
}

if (Date.hasOwnProperty('parse')) {
  $FAIL('#2: The Date.parse property has not the attributes DontDelete');
}


