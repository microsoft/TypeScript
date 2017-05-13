// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is -0, Math.exp(x) is 1
 *
 * @path ch15/15.8/15.8.2/15.8.2.8/S15.8.2.8_A3.js
 * @description Checking if Math.exp(-0) is 1
 */

// CHECK#1
var x = -0;
if (Math.exp(x) !== 1)
{
	$ERROR("#1: 'var x = -0; Math.exp(x) !== 1'");
}

