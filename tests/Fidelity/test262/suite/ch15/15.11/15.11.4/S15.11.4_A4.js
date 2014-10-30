// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Since Error prototype object is not function it has not [[create]] method
 *
 * @path ch15/15.11/15.11.4/S15.11.4_A4.js
 * @description Checking if creating "new Error.prototype" fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
try {
	__instance = new Object.prototype;
	$FAIL('#1: "__instance = new Object.prototype" lead to throwing exception');
} catch (e) {
    if (e instanceof Test262Error) throw e;
}
//
//////////////////////////////////////////////////////////////////////////////

