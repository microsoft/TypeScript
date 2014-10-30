// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If any value is NaN, the result of Math.max is NaN
 *
 * @path ch15/15.8/15.8.2/15.8.2.11/S15.8.2.11_A2.js
 * @description The script tests Math.max giving 1, 2 and 3 arguments to the function where at least one of the arguments is NaN
 */

// CHECK#1
if (!isNaN(Math.max(NaN)))
{
	$ERROR("#1: 'isNaN(Math.max(NaN)) === false");
}

// CHECK#2
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
for (i = 0; i <= 1; i++)
{
	args[i] = NaN;
	for (j = 0; j < valnum; j++)
	{
		args[1-i] = vals[j];
		if (!isNaN(Math.max(args[0], args[1])))
		{
			$ERROR("#2: 'isNaN(Math.max(" + args[0] + ", " + args[1] + ")) === false");
		}	
	}
}

// CHECK #3
var k = 1;
var l = 2;
for (i = 0; i <= 2; i++)
{
	args[i] = NaN;
	if (i === 1)
	{
		k = 0;
	} else if (i === 2)
	{
	 	l = 1;	
	}
	for (j = 0; j < valnum; j++)
	{
		for (jj = 0; jj < valnum; jj++)
		{
			args[k] = vals[j];
			args[l] = vals[jj];
			if (!isNaN(Math.max(args[0], args[1], args[2])))
			{
				$ERROR("#3: 'isNaN(Math.max(" + args[0] + ", " + args[1] + ", " + args[2] + ")) === false");
			}	
		}
	}
}

