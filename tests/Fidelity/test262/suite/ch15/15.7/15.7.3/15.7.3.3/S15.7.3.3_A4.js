// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.MIN_VALUE has the attribute DontEnum
 *
 * @path ch15/15.7/15.7.3/15.7.3.3/S15.7.3.3_A4.js
 * @description Checking if enumerating Number.MIN_VALUE fails
 */

//CHECK#1
for(var x in Number) {
  if(x === "MIN_VALUE") {
    $ERROR('#1: Number.MIN_VALUE has the attribute DontEnum');
  }
}

if (Number.propertyIsEnumerable('MIN_VALUE')) {
  $ERROR('#2: Number.MIN_VALUE has the attribute DontEnum');
}

