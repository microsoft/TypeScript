// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype.getTime property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.9/S15.9.5.9_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.getTime.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.prototype.getTime.length property has the attribute DontEnum');
}

for(x in Date.prototype.getTime) {
  if(x === "length") {
    $ERROR('#2: The Date.prototype.getTime.length has the attribute DontEnum');
  }
}


