// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is less than 0 but greater than -1, Math.ceil(x) is -0
 *
 * @path ch15/15.8/15.8.2/15.8.2.6/S15.8.2.6_A6.js
 * @description Checking if Math.ceil(x) is -0, where x is less than 0 but greater than -1
 */

// CHECK#1
var x = -0.000000000000001;
if (Math.ceil(x) !== -0)
{
	$ERROR("#1: 'var x = -0.000000000000001; Math.ceil(x) !== -0'");
}

// CHECK#2
var x = -0.999999999999999;
if (Math.ceil(x) !== -0)
{
	$ERROR("#2: 'var x = -0.999999999999999; Math.ceil(x) !== -0'");
}

// CHECK#3
var x = -0.5;
if (Math.ceil(x) !== -0)
{
	$ERROR("#3: 'var x = -0.5; Math.ceil(x) !== -0'");
}

