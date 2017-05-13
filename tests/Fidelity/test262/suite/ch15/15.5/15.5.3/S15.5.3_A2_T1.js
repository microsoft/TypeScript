// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the String constructor is the Function prototype object
 *
 * @path ch15/15.5/15.5.3/S15.5.3_A2_T1.js
 * @description Checking Function.prototype.isPrototypeOf(String)
 */

//////////////////////////////////////////////////////////////////////////////
// CHECK#
if (!(Function.prototype.isPrototypeOf(String))) {
  $ERROR('#1: Function.prototype.isPrototypeOf(String) return true. Actual: '+Function.prototype.isPrototypeOf(String));
}
//
//////////////////////////////////////////////////////////////////////////////

