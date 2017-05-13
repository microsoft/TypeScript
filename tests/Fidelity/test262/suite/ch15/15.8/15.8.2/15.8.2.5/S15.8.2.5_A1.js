// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If either x or y is NaN, Math(x,y) is NaN
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A1.js
 * @description Checking if Math.atan2(NaN,y) and Math.atan2(x,NaN) is NaN for different x and y values
 */

// CHECK#1

vals = new Array();
vals[0] = -Infinity;
vals[1] = -0.000000000000001;
vals[2] = -0;
vals[3] = +0
vals[4] = 0.000000000000001;
vals[5] = +Infinity;
vals[6] = NaN;
valnum = 7;

args = new Array();
for (i = 0; i < 2; i++)
{
	args[i] = NaN;
	for (j = 0; j < valnum; j++)
	{
		args[1-i] = vals[j];
		if (!isNaN(Math.atan2(args[0], args[1])))
		{
			$ERROR("#1: isNaN(Math.atan2(" + args[0] + ", " + args[1] + ")) === false'");
		}
	}
}

