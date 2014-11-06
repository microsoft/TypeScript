// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of
 * the Array constructor is the Function prototype object
 *
 * @path ch15/15.4/15.4.3/S15.4.3_A1.1_T2.js
 * @description Function.prototype.toString = Object.prototype.toString
 */

//CHECK#1
Function.prototype.toString = Object.prototype.toString;
if (Array.toString() !== "[object " + "Function" + "]") {
  $ERROR('#1: Function.prototype.toString = Object.prototype.toString; Array.toString() === "[object " + "Function" + "]". Actual: ' + (Array.toString()));
}

