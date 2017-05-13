// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Class]] property of the newly constructed object
 * is set to "Number"
 *
 * @path ch15/15.7/15.7.2/S15.7.2.1_A4.js
 * @description For testing toString function is used
 */

delete Number.prototype.toString;

var obj = new Number();

//CHECK#1
if (obj.toString() !== "[object Number]") {
  $ERROR('#1: The [[Class]] property of the newly constructed object is set to "Number"');
}

