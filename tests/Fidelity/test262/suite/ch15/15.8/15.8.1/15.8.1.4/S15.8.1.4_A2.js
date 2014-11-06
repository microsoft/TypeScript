// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Value Property LOG2E of the Math Object has the attribute DontEnum
 *
 * @path ch15/15.8/15.8.1/15.8.1.4/S15.8.1.4_A2.js
 * @description Checking if Math.LOG2E property has the attribute DontEnum
 */

// CHECK#1
for(x in Math) {
  if(x === "LOG2E") {
    $ERROR('#1: Value Property LOG2E of the Math Object hasn\'t attribute DontEnum: \'for(x in Math) {x==="LOG2E"}\'');
  }
}


