// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * @path ch15/15.4/15.4.4/S15.4.4_A1.1_T2.js
 * @description The Array prototype object is itself an array; its [[Class]] is "Array",
 */

//CHECK#1
if (Object.prototype.toString.call(Array.prototype) !== "[object Array]") {
  $ERROR('The Array prototype object is itself an array; its' +
         '[[Class]] is "Array".');
}

