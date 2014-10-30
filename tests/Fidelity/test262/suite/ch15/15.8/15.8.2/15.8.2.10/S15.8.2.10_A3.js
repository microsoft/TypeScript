// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is +0 or -0, Math.log(x) is -Infinity
 *
 * @path ch15/15.8/15.8.2/15.8.2.10/S15.8.2.10_A3.js
 * @description Checking if Math.log(+0) and Math.log(-0) equals to -Infinity
 */

// CHECK#1
var x = +0;
if (Math.log(x) !== -Infinity)
{
	$ERROR("#1: 'var x=+0; Math.log(x) !== -Infinity'");
}

// CHECK#2
var x = -0;
if (Math.log(x) !== -Infinity)
{
	$ERROR("#1: 'var x=-0; Math.log(x) !== -Infinity'");
}

