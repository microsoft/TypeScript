// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "valueOf" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.8/S15.9.5.8_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.propertyIsEnumerable('valueOf')) {
  $ERROR('#1: The Date.prototype.valueOf property has the attribute DontEnum');
}

for(x in Date.prototype) {
  if(x === "valueOf") {
    $ERROR('#2: The Date.prototype.valueOf has the attribute DontEnum');
  }
}


