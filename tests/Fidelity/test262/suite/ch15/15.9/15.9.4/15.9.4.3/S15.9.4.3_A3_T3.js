// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date.UTC property "length" has { ReadOnly, DontDelete, DontEnum } attributes
 *
 * @path ch15/15.9/15.9.4/15.9.4.3/S15.9.4.3_A3_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.UTC.propertyIsEnumerable('length')) {
  $ERROR('#1: The Date.UTC.length property has the attribute DontEnum');
}

for(x in Date.UTC) {
  if(x === "length") {
    $ERROR('#2: The Date.UTC.length has the attribute DontEnum');
  }
}


