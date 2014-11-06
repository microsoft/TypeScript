// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date property "UTC" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.4/15.9.4.3/S15.9.4.3_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.propertyIsEnumerable('UTC')) {
  $ERROR('#1: The Date.UTC property has the attribute DontEnum');
}

for(x in Date) {
  if(x === "UTC") {
    $ERROR('#2: The Date.UTC has the attribute DontEnum');
  }
}


