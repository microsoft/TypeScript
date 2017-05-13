// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is greater than 1, Math.acos(x) is NaN
 *
 * @path ch15/15.8/15.8.2/15.8.2.2/S15.8.2.2_A2.js
 * @description Checking if Math.acos(x) is NaN, where x is greater than 1
 */

// CHECK#1
var x = 1.000000000000001;
if (!isNaN(Math.acos(x)))
{
	$ERROR("#1: 'var x = 1.000000000000001; isNaN(Math.acos(x)) === false'");
}

// CHECK#2
x = 2;
if (!isNaN(Math.acos(x)))
{
	$ERROR("#2: 'x = 2; isNaN(Math.acos(x)) === false'");
}

// CHECK#3
x = +Infinity;
if (!isNaN(Math.acos(x)))
{
	$ERROR("#3: 'x = +Infinity; isNaN(Math.acos(x)) === false'");
}

