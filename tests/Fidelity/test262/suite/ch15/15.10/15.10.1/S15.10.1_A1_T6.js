// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp syntax errors must be caught when matcher(s) compiles
 *
 * @path ch15/15.10/15.10.1/S15.10.1_A1_T6.js
 * @description Tested RegExp is "a????"
 */

//CHECK#1
try {
	$ERROR('#1.1: new RegExp("a????") throw SyntaxError. Actual: ' + (new RegExp("a????")));
} catch (e) {
	if ((e instanceof SyntaxError) !== true) {
		$ERROR('#1.2: new RegExp("a????") throw SyntaxError. Actual: ' + (e));
	}
}


