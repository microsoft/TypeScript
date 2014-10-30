// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.toLocaleString.length property has the attribute DontDelete
 *
 * @path ch15/15.2/15.2.4/15.2.4.3/S15.2.4.3_A9.js
 * @description Checknig if deleting of the Object.prototype.toLocaleString.length property fails
 * @noStrict
 */

//CHECK#0
if (!(Object.prototype.toLocaleString.hasOwnProperty('length'))) {
  $FAIL('#0: the Object.prototype.toLocaleString has length property');
}

//CHECK#1
if (delete Object.prototype.toLocaleString.length) {
  $ERROR('#1: The Object.prototype.toLocaleString.length property has the attributes DontDelete');
}

//CHECK#2
if (!(Object.prototype.toLocaleString.hasOwnProperty('length'))) {
  $FAIL('#2: The Object.prototype.toLocaleString.length property has the attributes DontDelete');
}

