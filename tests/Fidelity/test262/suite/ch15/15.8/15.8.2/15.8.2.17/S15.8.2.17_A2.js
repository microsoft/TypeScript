// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x less than 0, Math.sqrt(x) is NaN
 *
 * @path ch15/15.8/15.8.2/15.8.2.17/S15.8.2.17_A2.js
 * @description Checking if Math.sqrt(x) is NaN, where x is less than 0
 */

// CHECK#1
var x = -0.000000000000001;
if (!isNaN(Math.sqrt(x)))
{
	$ERROR("#1: 'var x=-0.000000000000001; isNaN(Math.sqrt(x)) === false'");
}

// CHECK#2
var x = -1;
if (!isNaN(Math.sqrt(x)))
{
	$ERROR("#2: 'var x=-1; isNaN(Math.sqrt(x)) === false'");
}

// CHECK#3
var x = -Infinity;
if (!isNaN(Math.sqrt(x)))
{
	$ERROR("#3: 'var x=-Infinity; isNaN(Math.sqrt(x)) === false'");
}

