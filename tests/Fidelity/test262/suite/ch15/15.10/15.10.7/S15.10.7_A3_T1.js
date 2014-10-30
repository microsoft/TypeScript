// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp instance type is RegExp
 *
 * @path ch15/15.10/15.10.7/S15.10.7_A3_T1.js
 * @description Checking type of RegExp instance with operators typeof, instanceof and check it constructor.
 * RegExp instance is /[^a]* /
 */

__re = /[^a]*/;

//CHECK#1
if (typeof __re !== "object") {
	$ERROR('#1: __re = /[^a]*/; typeof __re === "object". Actual: ' + (typeof __re));
}

//CHECK#1
if (__re.constructor !== RegExp) {
	$ERROR('#2: __re = /[^a]*/; __re.constructor === RegExp. Actual: ' + (__re.constructor));
}

//CHECK#3
if ((__re instanceof RegExp) !== true) {
	$ERROR('#3: __re = /[^a]*/; (__re instanceof RegExp) === true');
}


