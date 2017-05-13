// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is +0, Math.atan(x) is +0
 *
 * @path ch15/15.8/15.8.2/15.8.2.4/S15.8.2.4_A2.js
 * @description Checking if Math.atan(+0) equals to +0
 */

// CHECK#1
var x = +0;
if (Math.atan(x) !== +0)
{
	$ERROR("#1: 'var x = +0; Math.atan(x) !== +0'");
}

