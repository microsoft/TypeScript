// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production Assertion :: $ evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the ...
 *
 * @path ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A1_T1.js
 * @description Execute /s$/.test("pairs\nmakes\tdouble") and check results
 */

__executed = /s$/.test("pairs\nmakes\tdouble");

//CHECK#1
if (__executed) {
	$ERROR('#1: /s$/.test("pairs\\nmakes\\tdouble") === false');
}


