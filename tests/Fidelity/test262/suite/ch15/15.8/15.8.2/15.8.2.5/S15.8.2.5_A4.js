// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y is +0 and x>0, Math.atan2(y,x) is +0
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A4.js
 * @description Checking if Math.atan2(y,x) equals to +0, where y is +0 and x>0
 */

// CHECK#1
y = +0;
x = new Array();
x[0] = 0.000000000000001;
x[2] = +Infinity;
x[1] = 1; 
xnum = 3;

for (i = 0; i < xnum; i++)
{
	if (Math.atan2(y,x[i]) !== +0)
		$FAIL("#1: Math.atan2(" + y + ", " + x[i] + ") !== +0");
}

