// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClass :: [ ^ ClassRanges ] evaluates by evaluating ClassRanges to  obtain a CharSet and returning that CharSet and the boolean true
 *
 * @path ch15/15.10/15.10.2/15.10.2.13/S15.10.2.13_A2_T6.js
 * @description Execute /a[^b]c/.test("abc") and check results
 */

__executed = /a[^b]c/.test("abc");

//CHECK#1
if (__executed) {
	$ERROR('#1: /a[^b]c/.test("abc") === false');
}


