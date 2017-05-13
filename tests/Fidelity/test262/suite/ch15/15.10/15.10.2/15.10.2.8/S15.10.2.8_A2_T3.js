// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The form (?! Disjunction ) specifies a zero-width negative lookahead.
 * In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
 * The current position is not advanced before matching the sequel
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A2_T3.js
 * @description Execute /Java(?!Script)([A-Z]\w*)/.test("using of Java language") and check results
 */

__executed = /Java(?!Script)([A-Z]\w*)/.test("using of Java language");

//CHECK#1
if (__executed) {
	$ERROR('#1: /Java(?!Script)([A-Z]\\w*)/.test("using of Java language") === false');
}


