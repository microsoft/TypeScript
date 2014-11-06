// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is less than or equal to -0 and x is greater than or equal to -0.5, Math.round(x) is equal to -0
 *
 * @path ch15/15.8/15.8.2/15.8.2.15/S15.8.2.15_A7.js
 * @description Checking if Math.round(x) is equal -0, where x is equal to 0, equal to -0.5, or less than -0 while greater than -0.5
 */

// CHECK#1
if (Math.round(-0) !== -0)
{
	$ERROR("#1: 'Math.round(-0) !== -0'");
}

// CHECK#2
if (Math.round(-0.5) !== -0)
{
	$ERROR("#2: 'Math.round(-0.5) !== -0'");
}

// CHECK#3
if (Math.round(-0.25) !== -0)
{
	$ERROR("#3: 'Math.round(-0.25) !== -0'");
}

