// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.setFullYear property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.40/S15.9.5.40_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.setFullYear.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.setFullYear.length property has the attribute DontEnum');
}

for(x in Date.prototype.setFullYear) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.setFullYear.length has the attribute DontEnum');
  }
}


