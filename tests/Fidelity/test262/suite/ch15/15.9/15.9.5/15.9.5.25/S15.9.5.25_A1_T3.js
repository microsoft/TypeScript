// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.prototype property "getUTCMilliseconds" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.5/15.9.5.25/S15.9.5.25_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.prototype.propertyIsEnumerable('getUTCMilliseconds')) {
  $ERROR('#1: The Date.prototype.getUTCMilliseconds property has the attribute DontEnum');
}

for(x in Date.prototype) {
  if(x === "getUTCMilliseconds") {
    $ERROR('#2: The Date.prototype.getUTCMilliseconds has the attribute DontEnum');
  }
}


