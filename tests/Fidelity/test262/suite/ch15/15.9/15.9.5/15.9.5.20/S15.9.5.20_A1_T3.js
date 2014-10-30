// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getMinutes" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.20/S15.9.5.20_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.propertyIsEnumerable('getMinutes')) {
  $ERROR('#1: The Date.prototype.getMinutes property has the attribute DontEnum');
}

for(x in Date.prototype) {
  if(x === "getMinutes") {
    $ERROR('#2: The Date.prototype.getMinutes has the attribute DontEnum');
  }
}


