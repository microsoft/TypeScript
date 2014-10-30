// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "setMinutes" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.32/S15.9.5.32_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.propertyIsEnumerable('setMinutes')) {
  $ERROR('#1: The Date.prototype.setMinutes property has the attribute DontEnum');
}

for(x in Date.prototype) {
  if(x === "setMinutes") {
    $ERROR('#2: The Date.prototype.setMinutes has the attribute DontEnum');
  }
}


