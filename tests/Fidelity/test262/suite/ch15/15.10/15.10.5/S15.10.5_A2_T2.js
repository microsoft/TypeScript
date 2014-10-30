// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of the internal [[Prototype]] property of the RegExp constructor is the Function prototype object
 *
 * @path ch15/15.10/15.10.5/S15.10.5_A2_T2.js
 * @description Add new property to Function.prototype and then check this property of RegExp
 */

Function.prototype.indicator = 1;

 //CHECK#1
if (RegExp.indicator !== 1) {
	$ERROR('#1: Function.prototype.indicator = 1; RegExp.indicator === 1. Actual: ' + (RegExp.indicator));
}


