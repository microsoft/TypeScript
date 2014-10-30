// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Tangent is a periodic function with period PI
 *
 * @path ch15/15.8/15.8.2/15.8.2.18/S15.8.2.18_A6.js
 * @description Checking if Math.tan(x) equals to Math.tan(x+n*Math.PI) with precision 0.000000000003, where n is an integer from 1 to 100 and x is one of 10 float point values from 0 to Math.PI
 */

// CHECK#1
  prec = 0.00000000003;
//prec = 0.000000000000001;
period = Math.PI;
pernum = 100;

a = -pernum * period + period/2;
b = pernum * period - period/2;
snum = 9; 
step = period/(snum + 2);
x = new Array();
for (i = 0; i <= snum; i++)    //// We exlude special points 
{							   ////           in this cycle.
	x[i] = a + (i+1)*step;     ////
}							   ////


var curval;
var curx;
var j;
for (i = 0; i < snum; i++)
{
	curval = Math.tan(x[i]);
	curx = x[i] + period;
	j = 0;
	while (curx <= b)
	{
		curx += period;
		j++;
		if (Math.abs(Math.tan(curx) - curval) >= prec)
		{
			$FAIL("#1: tan is found out to not be periodic:\n Math.abs(Math.tan(" + x[i] + ") - Math.tan(" + x[i] + " + 2*Math.PI*" + j + ")) >= " + prec + "\n Math.tan(" + x[i] + ") === " + curval + "\n Math.tan(" + curx + ") === " + Math.tan(curx));
		}
	}
}

