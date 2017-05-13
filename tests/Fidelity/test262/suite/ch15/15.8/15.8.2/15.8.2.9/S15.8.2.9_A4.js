// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is +Infinity, Math.floor(x) is +Infinity
 *
 * @path ch15/15.8/15.8.2/15.8.2.9/S15.8.2.9_A4.js
 * @description Checking if Math.floor(x) is +Infinity, where x is +Infinity
 */

// CHECK#1
var x = +Infinity;
if (Math.floor(x) !== +Infinity)
{
	$ERROR("#1: 'var x = +Infinity; Math.floor(x) !== +Infinity'");
}

