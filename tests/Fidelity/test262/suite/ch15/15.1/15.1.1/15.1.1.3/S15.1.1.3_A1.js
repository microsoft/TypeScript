// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The initial value of undefined is undefined
 *
 * @path ch15/15.1/15.1.1/15.1.1.3/S15.1.1.3_A1.js
 * @description Use typeof, isNaN, isFinite
 */

// CHECK#1
if (typeof(undefined) !== "undefined") {
	$ERROR('#1: typeof(undefined) === "undefined". Actual: ' + (typeof(undefined))); 
}

// CHECK#2
if (undefined !== void 0) {
	$ERROR('#2: undefined === void 0. Actual: ' + (undefined)); 
}

// CHECK#3
if (undefined !== eval("var x")) {
	$ERROR('#3: undefined === eval("var x"). Actual: ' + (undefined)); 
}

