// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Date property "parse" has { DontEnum } attributes
 *
 * @path ch15/15.9/15.9.4/15.9.4.2/S15.9.4.2_A1_T3.js
 * @description Checking DontEnum attribute
 */

if (Date.propertyIsEnumerable('parse')) {
  $ERROR('#1: The Date.parse property has the attribute DontEnum');
}

for(x in Date) {
  if(x === "parse") {
    $ERROR('#2: The Date.parse has the attribute DontEnum');
  }
}


