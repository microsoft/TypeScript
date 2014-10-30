// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The value of Math.ceil(x) is the same as the value of -Math.floor(-x)
 *
 * @path ch15/15.8/15.8.2/15.8.2.6/S15.8.2.6_A7.js
 * @description Checking if Math.ceil(x) equals to -Math.floor(-x) on 2000 floating point argument values
 */

// CHECK#1
for (i=-1000; i<1000; i++)
{
	x = i/10.0;
	if (Math.ceil(x) !== -Math.floor(-x))
	{
		$ERROR("#1: 'x = " + x + "; Math.ceil(x) !== -Math.floor(-x)'");
	}
}

