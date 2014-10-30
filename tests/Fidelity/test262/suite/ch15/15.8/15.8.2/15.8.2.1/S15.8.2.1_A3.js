// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is -Infinity, Math.abs(x) is +Infinity
 *
 * @path ch15/15.8/15.8.2/15.8.2.1/S15.8.2.1_A3.js
 * @description Checking if Math.abs(-Infinity) equals to +Infinity
 */

// CHECK#1
var x = -Infinity;
if (Math.abs(x) !== +Infinity)
{
	$ERROR("#1: 'var x=-Infinity; Math.abs(x) !== +Infinity'");
}

