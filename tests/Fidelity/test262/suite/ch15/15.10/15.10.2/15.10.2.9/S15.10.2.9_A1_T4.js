// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * An escape sequence of the form \ followed by a nonzero decimal number n matches the result of the nth set of capturing parentheses (see 15.10.2.11)
 *
 * @path ch15/15.10/15.10.2/15.10.2.9/S15.10.2.9_A1_T4.js
 * @description Execute /\b(\w+) \2\b/.test("do you listen the the band") and check results
 */

__executed = /\b(\w+) \2\b/.test("do you listen the the band");

//CHECK#1
if (__executed) {
	$ERROR('#1: /\\b(\\w+) \\2\\b/.test("do you listen the the band") === false');
}


