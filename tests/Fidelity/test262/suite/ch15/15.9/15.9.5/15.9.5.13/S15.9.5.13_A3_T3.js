// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getUTCMonth property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.13/S15.9.5.13_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.getUTCMonth.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.getUTCMonth.length property has the attribute DontEnum');
}

for(x in Date.prototype.getUTCMonth) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.getUTCMonth.length has the attribute DontEnum');
  }
}


