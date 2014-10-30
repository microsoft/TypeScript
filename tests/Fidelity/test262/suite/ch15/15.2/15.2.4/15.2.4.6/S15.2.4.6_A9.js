// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Object.prototype.isPrototypeOf.length property has the attribute DontDelete
 *
 * @path ch15/15.2/15.2.4/15.2.4.6/S15.2.4.6_A9.js
 * @description Checking deleting the Object.prototype.isPrototypeOf.length property fails
 */

//CHECK#0
if (!(Object.prototype.isPrototypeOf.hasOwnProperty('length'))) {
  $FAIL('#0: the Object.prototype.isPrototypeOf has length property');
}

//CHECK#1
if (delete Object.prototype.isPrototypeOf.length) {
  $ERROR('#1: The Object.prototype.isPrototypeOf.length property has the attributes DontDelete');
}
//

