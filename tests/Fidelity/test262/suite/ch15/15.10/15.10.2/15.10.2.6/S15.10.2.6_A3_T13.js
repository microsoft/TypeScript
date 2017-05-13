// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production Assertion :: \b evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the ...
 *
 * @path ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A3_T13.js
 * @description Execute /op\b/.test("pilot\nsoviet robot\topenoffice") and check results
 */

__executed = /op\b/.test("pilot\nsoviet robot\topenoffice");

//CHECK#1
if (__executed) {
	$ERROR('#1: /op\\b/.test("pilot\\nsoviet robot\\topenoffice") === false');
}


