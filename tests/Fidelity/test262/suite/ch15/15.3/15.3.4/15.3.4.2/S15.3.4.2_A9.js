// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Function.prototype.toString.length property has the attribute DontDelete
 *
 * @path ch15/15.3/15.3.4/15.3.4.2/S15.3.4.2_A9.js
 * @description Checking if deleting the Function.prototype.toString.length property fails
 */

//CHECK#0
if (!(Function.prototype.toString.hasOwnProperty('length'))) {
  $FAIL('#0: the Function.prototype.toString has length property');
}

//CHECK#1
if (delete Function.prototype.toString.length) {
  $ERROR('#1: The Function.prototype.toString.length property has the attributes DontDelete');
}

//CHECK#2
if (!(Function.prototype.toString.hasOwnProperty('length'))) {
  $FAIL('#2: The Function.prototype.toString.length property has the attributes DontDelete');
}

