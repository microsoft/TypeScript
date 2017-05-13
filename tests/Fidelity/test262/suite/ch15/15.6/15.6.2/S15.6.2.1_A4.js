// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The [[Class]] property of the newly constructed object
 * is set to "Boolean"
 *
 * @path ch15/15.6/15.6.2/S15.6.2.1_A4.js
 * @description For testing toString function is used
 */

delete Boolean.prototype.toString;

var obj = new Boolean();

//CHECK#1
if (obj.toString() !== "[object Boolean]") {
  $ERROR('#1: The [[Class]] property of the newly constructed object is set to "Boolean"');
}

