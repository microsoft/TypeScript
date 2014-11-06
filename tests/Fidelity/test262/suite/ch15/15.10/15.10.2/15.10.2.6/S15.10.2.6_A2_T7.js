// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production Assertion :: ^ evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the ...
 *
 * @path ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A2_T7.js
 * @description Execute /^..^e/.test("ab\ncde") and check results
 */

__executed = /^..^e/.test("ab\ncde");

//CHECK#1
if (__executed) {
	$ERROR('#1: /^..^e/.test("ab\\ncde") === false');
}


