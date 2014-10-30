// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is +Infinity, Math.exp(x) is +Ifinity
 *
 * @path ch15/15.8/15.8.2/15.8.2.8/S15.8.2.8_A4.js
 * @description Checking if Math.exp(+Infinity) is +Ifinity
 */

// CHECK#1
var x = +Infinity;
if (Math.exp(x) !== +Infinity)
{
	$ERROR("#1: 'var x = +Infinity; Math.exp(x) !== +Infinity'");
}

