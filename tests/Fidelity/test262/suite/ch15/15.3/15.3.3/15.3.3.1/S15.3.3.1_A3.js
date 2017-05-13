// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Function.prototype property has the attribute DontDelete
 *
 * @path ch15/15.3/15.3.3/15.3.3.1/S15.3.3.1_A3.js
 * @description Checking if deleting the Function.prototype property fails
 */

delete Function.prototype;

//CHECK#1
if (!(Function.hasOwnProperty('prototype'))) {
  $ERROR('#1: the Function.prototype property has the attributes DontDelete.');
}

