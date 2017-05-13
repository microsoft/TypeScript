// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Cosine is a periodic function with period 2*PI
 *
 * @path ch15/15.8/15.8.2/15.8.2.7/S15.8.2.7_A6.js
 * @description Checking if Math.cos(x) equals to Math.cos(x+n*2*Math.PI) with precision 0.000000000003, where n is an integer from 1 to 100 and x is one of 10 float point values from -Math.PI to +Math.PI
 */

// CHECK#1
  prec = 0.000000000003;
//prec = 0.000000000000001;
period = 2*Math.PI;
pernum = 100;

a = -pernum * period;
b = pernum * period;
snum = 9; 
step = period/snum + 0.0;
x = new Array();
for (i = 0; i < snum; i++)
{
	x[i] = a + i*step;
}
x[9] = a + period;

var curval;
var curx;
var j;
for (i = 0; i < snum; i++)
{
	curval = Math.cos(x[i]);
	curx = x[i] + period;
	j = 0;
	while (curx <= b)
	{
		curx += period;
		j++;
		if (Math.abs(Math.cos(curx) - curval) >= prec)
		{
			$FAIL("#1: cos is found out to not be periodic:\n Math.abs(Math.cos(" + x[i] + ") - Math.cos(" + x[i] + " + 2*Math.PI*" + j + ")) >= " + prec + "\n Math.cos(" + x[i] + ") === " + curval + "\n Math.cos(" + curx + ") === " + Math.cos(curx));
		}
	}
}

