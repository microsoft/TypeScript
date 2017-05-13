// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Class]] property of Object prototype object is "Object"
 *
 * @path ch15/15.2/15.2.4/S15.2.4_A2.js
 * @description Getting the value of the internal [[Class]] property with Object.prototype.toString() function
 */

var tostr = Object.prototype.toString();

//CHECK#1
if (tostr !== "[object Object]") {
  $ERROR('#1: the value of the internal [[Class]] property of Object prototype object is "Object"');
}

