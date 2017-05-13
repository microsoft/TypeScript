// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
 *
 * @path ch15/15.10/15.10.2/15.10.2.7/S15.10.2.7_A5_T3.js
 * @description Execute /java(script)?/.test("state: both Java and JavaScript used in web development") and check results
 */

__executed = /java(script)?/.test("state: both Java and JavaScript used in web development");

//CHECK#1
if (__executed) {
	$ERROR('#1: /java(script)?/.test("state: both Java and JavaScript used in web development") === false');
}


