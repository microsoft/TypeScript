// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the apply method is 2
 *
 * @path ch15/15.3/15.3.4/15.3.4.3/S15.3.4.3_A2_T1.js
 * @description Checking Function.prototype.apply.length
 */

//CHECK#1
if (typeof Function.prototype.apply !== "function") {
  $ERROR('#1: apply method defined');
}

//CHECK#2
if (typeof Function.prototype.apply.length === "undefined") {
  $ERROR('#2: length property of apply method defined');
}

//CHECK#3
if (Function.prototype.apply.length !== 2) {
  $ERROR('#3: The length property of the apply method is 2');
}

