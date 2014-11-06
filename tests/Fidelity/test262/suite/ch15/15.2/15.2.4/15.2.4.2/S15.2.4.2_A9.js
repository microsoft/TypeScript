// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.toString.length property has the attribute DontDelete
 *
 * @path ch15/15.2/15.2.4/15.2.4.2/S15.2.4.2_A9.js
 * @description Checknig if deleting of the Object.prototype.toString.length property fails
 * @noStrict
 */

//CHECK#0
if (!(Object.prototype.toString.hasOwnProperty('length'))) {
  $FAIL('#0: the Object.prototype.toString has length property');
}

//CHECK#1
if (delete Object.prototype.toString.length) {
  $ERROR('#1: The Object.prototype.toString.length property has the attributes DontDelete');
}

//CHECK#2
if (!(Object.prototype.toString.hasOwnProperty('length'))) {
  $FAIL('#2: The Object.prototype.toString.length property has the attributes DontDelete');
}

