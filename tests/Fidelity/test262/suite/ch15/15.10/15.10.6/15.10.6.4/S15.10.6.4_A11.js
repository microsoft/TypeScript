// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the toString method is 1
 *
 * @path ch15/15.10/15.10.6/15.10.6.4/S15.10.6.4_A11.js
 * @description Checking RegExp.prototype.toString.length
 */

//CHECK#1
if (RegExp.prototype.toString.hasOwnProperty("length") !== true) {
	$FAIL('#1: RegExp.prototype.toString.hasOwnProperty(\'length\') === true');
}

//CHECK#2
if (RegExp.prototype.toString.length !== 0) {
	$ERROR('#2: RegExp.prototype.toString.length === 0. Actual: ' + (RegExp.prototype.toString.length));
}


