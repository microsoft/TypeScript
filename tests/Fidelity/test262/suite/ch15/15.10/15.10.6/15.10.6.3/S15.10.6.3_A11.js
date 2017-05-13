// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the test method is 1
 *
 * @path ch15/15.10/15.10.6/15.10.6.3/S15.10.6.3_A11.js
 * @description Checking RegExp.prototype.test.length
 */

//CHECK#1
if (RegExp.prototype.test.hasOwnProperty("length") !== true) {
  $FAIL('#1: RegExp.prototype.test.hasOwnProperty(\'length\') === true');
}

//CHECK#2
if (RegExp.prototype.test.length !== 1) {
  $ERROR('#2: RegExp.prototype.test.length === 1. Actual: ' + (RegExp.prototype.test.length));
}


