// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * i) The production QuantifierPrefix :: { DecimalDigits } evaluates...
 * ii) The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
 *
 * @path ch15/15.10/15.10.2/15.10.2.7/S15.10.2.7_A2_T4.js
 * @description Execute /b{8}c/.test("aaabbbbcccddeeeefffff") and check results
 */

__executed = /b{8}/.test("aaabbbbcccddeeeefffff");

//CHECK#1
if (__executed) {
	$ERROR('#1: /b{8}/.test("aaabbbbcccddeeeefffff") === false');
}


