// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setUTCMonth property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.39/S15.9.5.39_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.setUTCMonth.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.setUTCMonth.length property has the attribute DontEnum');
}

for(x in Date.prototype.setUTCMonth) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.setUTCMonth.length has the attribute DontEnum');
  }
}


