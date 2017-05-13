// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is equal to 0 or greater than 0, or if x is less than -0.5, Math.round(x) is equal to Math.floor(x+0.5)
 *
 * @path ch15/15.8/15.8.2/15.8.2.15/S15.8.2.15_A6.js
 * @description Checking if Math.round(x) is equal to Math.floor(x+0.5), where x equals to 0, greater than 0, or is less than -0.5; this check is performed on 2000 argument x values
 */

// CHECK#1
for (i = 0; i <= 1000; i++)
{
	x = i/10.0;
	if (Math.round(x) !== Math.floor(x + 0.5))
	{
		$ERROR("#1: 'x = " + x + "; Math.round(x) !== Math.floor(x + 0.5)'")
	}
}

for (i = -5; i >= -1000; i--)
{
	if (i === -5)
	{
		x = -0.500000000000001;
	} else
	{
		x = i/10.0;
	}
	
	if (Math.round(x) !== Math.floor(x + 0.5))
	{
		$ERROR("#2: 'x = " + x + "; Math.round(x) !== Math.floor(x + 0.5)'")
	}
}

