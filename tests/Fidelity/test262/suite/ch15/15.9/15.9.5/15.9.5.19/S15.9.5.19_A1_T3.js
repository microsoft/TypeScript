// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCHours" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.19/S15.9.5.19_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.propertyIsEnumerable('getUTCHours')) {
  $ERROR('#1: The Date.prototype.getUTCHours property has the attribute DontEnum');
}

for(x in Date.prototype) {
  if(x === "getUTCHours") {
    $ERROR('#2: The Date.prototype.getUTCHours has the attribute DontEnum');
  }
}


