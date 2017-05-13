// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Array prototype object does not have a valueOf property of
 * its own; however, it inherits the valueOf property from the valueOf
 * property from the Object prototype Object
 *
 * @path ch15/15.4/15.4.4/S15.4.4_A2.1_T1.js
 * @description Checking use hasOwnProperty
 */

//CHECK#1
if (Array.prototype.hasOwnProperty('valueOf') !== false) {
  $ERROR('#1: Array.prototype.hasOwnProperty(\'valueOf\') === false. Actual: ' + (Array.prototype.hasOwnProperty('valueOf')));
}

