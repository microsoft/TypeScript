// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.MAX_VALUE has the attribute DontEnum
 *
 * @path ch15/15.7/15.7.3/15.7.3.2/S15.7.3.2_A4.js
 * @description Checking if enumerating Number.MAX_VALUE fails
 */

//CHECK#1
for(var x in Number) {
  if(x === "MAX_VALUE") {
    $ERROR('#1: Number.MAX_VALUE has the attribute DontEnum');
  }
}

if (Number.propertyIsEnumerable('MAX_VALUE')) {
  $ERROR('#2: Number.MAX_VALUE has the attribute DontEnum');
}

