// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y<0 and y is finite and x is equal to +Infinity, Math.atan2(y,x) is -0
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A16.js
 * @description Checking if Math.atan2(y,x) is -0, where y<0 and y is finite and x is equal to +Infinity
 */

// CHECK#1
x = +Infinity;
y = new Array();
y[0] = -0.000000000000001;
y[1] = -1;
y[2] = -1.7976931348623157E308; //largest by abs() finite number 
ynum = 3;

for (i = 0; i < ynum; i++)
{
	if (Math.atan2(y[i],x) !== -0)
		$FAIL("#1: Math.atan2(" + y[i] + ", " + x + ") !== -0");
}

