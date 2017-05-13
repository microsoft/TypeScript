// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the String constructor is the Function prototype object
 *
 * @path ch15/15.5/15.5.3/S15.5.3_A2_T2.js
 * @description Add custom property to Function.prototype and check it at String
 */

Function.prototype.indicator = 1;

//////////////////////////////////////////////////////////////////////////////
// CHECK#
if (String.indicator !== 1) {
  $ERROR('#1: Function.prototype.indicator = 1; String.indicator === 1. Actual: String.indicator ==='+String.indicator ); 
}
//
//////////////////////////////////////////////////////////////////////////////

