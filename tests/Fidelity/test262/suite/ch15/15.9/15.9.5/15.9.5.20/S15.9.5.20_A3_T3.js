// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getMinutes property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.20/S15.9.5.20_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.getMinutes.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.getMinutes.length property has the attribute DontEnum');
}

for(x in Date.prototype.getMinutes) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.getMinutes.length has the attribute DontEnum');
  }
}


