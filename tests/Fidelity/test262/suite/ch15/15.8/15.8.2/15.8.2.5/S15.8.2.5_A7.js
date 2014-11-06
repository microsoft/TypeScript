// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y is equal to +0 and x<0, Math.atan2(y,x) is an implementation-dependent approximation to +PI
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A7.js
 * @description Checking if Math.atan2(y,x) is an approximation to +PI, where y is equal to +0 and x<0
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js"); 

// CHECK#1
y = +0;
//prec = 0.00000000000001;
x = new Array();
x[0] = -0.000000000000001;
x[2] = -Infinity;
x[1] = -1; 
xnum = 3;

for (i = 0; i < xnum; i++)
{
	if (!isEqual(Math.atan2(y,x[i]), Math.PI))
		$FAIL("#1: Math.abs(Math.atan2(" + y + ", " + x[i] + ") - Math.PI) >= " + prec);
}

