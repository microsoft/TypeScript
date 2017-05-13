// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property LN2 of the Math Object has the attribute DontEnum
 *
 * @path ch15/15.8/15.8.1/15.8.1.3/S15.8.1.3_A2.js
 * @description Checking if Math.LN2 property has the attribute DontEnum
 */

// CHECK#1
for(x in Math) {
  if(x === "LN2") {
    $ERROR('#1: Value Property LN2 of the Math Object hasn\'t attribute DontEnum: \'for(x in Math) {x==="LN2"}\'');
  }
}


