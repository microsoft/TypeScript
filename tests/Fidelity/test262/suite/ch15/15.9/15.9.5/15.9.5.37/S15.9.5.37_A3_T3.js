// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setUTCDate property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.37/S15.9.5.37_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.setUTCDate.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.setUTCDate.length property has the attribute DontEnum');
}

for(x in Date.prototype.setUTCDate) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.setUTCDate.length has the attribute DontEnum');
  }
}


