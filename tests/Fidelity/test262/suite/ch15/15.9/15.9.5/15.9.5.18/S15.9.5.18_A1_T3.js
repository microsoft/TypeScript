// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getHours" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.18/S15.9.5.18_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.propertyIsEnumerable('getHours')) {
  $ERROR('#1: The Date.prototype.getHours property has the attribute DontEnum');
}

for(x in Date.prototype) {
  if(x === "getHours") {
    $ERROR('#2: The Date.prototype.getHours has the attribute DontEnum');
  }
}


