// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y>0 and x is -0, Math.atan2(y,x) is an implementation-dependent approximation to +PI/2
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A3.js
 * @description Checking if Math.atan2(y,x) is an approximation to +PI/2, where y>0 and x is -0
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js"); 

// CHECK#1
x = -0;
//prec = 0.00000000000001;
y = new Array();
y[0] = 0.000000000000001;
y[2] = +Infinity;
y[1] = 1; 
ynum = 3;

for (i = 0; i < ynum; i++)
{
	if (!isEqual(Math.atan2(y[i],x), (Math.PI)/2))
		$FAIL("#1: Math.abs(Math.atan2(" + y[i] + ", " + x + ") - ((Math.PI)/2)) >= " + prec);
}

