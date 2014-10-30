// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is NaN and y is nonzero, Math.pow(x,y) is NaN
 *
 * @path ch15/15.8/15.8.2/15.8.2.13/S15.8.2.13_A4.js
 * @description Checking if Math.pow(x,y) is NaN, where x is NaN and y is nonzero
 */

// CHECK#1

x = NaN;
y = new Array();
y[0] = -Infinity;
y[1] = -1.7976931348623157E308; //largest (by module) finite number
y[2] = -0.000000000000001;
y[3] = 0.000000000000001;
y[4] = 1.7976931348623157E308; //largest finite number
y[5] = +Infinity;
y[6] = NaN;
ynum = 7;

for (i = 0; i < ynum; i++)
{
	if (!isNaN(Math.pow(x,y[i])))
	{
		$ERROR("#1: isNaN(Math.pow(" + x + ", " + y[i] + ")) === false");
	}
}

