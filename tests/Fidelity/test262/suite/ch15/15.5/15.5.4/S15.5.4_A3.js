// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the String prototype object is the Object prototype object (15.2.3.1)
 *
 * @path ch15/15.5/15.5.4/S15.5.4_A3.js
 * @description Checking Object.prototype.isPrototypeOf(String.prototype)
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(Object.prototype.isPrototypeOf(String.prototype))) {
  $ERROR('#1: Object.prototype.isPrototypeOf(String.prototype) return true. Actual: '+Object.prototype.isPrototypeOf(String.prototype)); 
}
//
//////////////////////////////////////////////////////////////////////////////

delete String.prototype.toString;

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.toString() != "[object "+"String"+"]") {
  $ERROR('#2: delete String.prototype.toString; String.prototype.toString() == "[object "+"String"+"]". Actual: String.prototype.toString() =='+String.prototype.toString() ); 
}
//
//////////////////////////////////////////////////////////////////////////////

