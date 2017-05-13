// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getUTCDay property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.17/S15.9.5.17_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.getUTCDay.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.getUTCDay.length property has the attribute DontEnum');
}

for(x in Date.prototype.getUTCDay) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.getUTCDay.length has the attribute DontEnum');
  }
}


