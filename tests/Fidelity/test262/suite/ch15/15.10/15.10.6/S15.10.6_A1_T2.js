// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the RegExp prototype object is the Object prototype
 *
 * @path ch15/15.10/15.10.6/S15.10.6_A1_T2.js
 * @description Add new property to Object.prototype and check it of RegExp.prototype
 */

Object.prototype.indicator = 1;

//CHECK#1
if (RegExp.prototype.indicator !== 1) {
	$ERROR('#1: Object.prototype.indicator = 1; RegExp.prototype.indicator === 1. Actual: ' + (RegExp.prototype.indicator));
}


