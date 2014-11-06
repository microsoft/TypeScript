// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production QuantifierPrefix :: * evaluates by returning the two results 0 and \infty
 *
 * @path ch15/15.10/15.10.2/15.10.2.7/S15.10.2.7_A4_T21.js
 * @description Execute /[xyz]*1/.test('a0.b2.c3') and check results
 */

__executed = /[xyz]*1/.test('a0.b2.c3');

//CHECK#1
if (__executed) {
	$ERROR('#1: /[xyz]*1/.test(\'a0.b2.c3\') === false');
}


