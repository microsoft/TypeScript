// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If x is -0, Math.floor(x) is -0
 *
 * @path ch15/15.8/15.8.2/15.8.2.9/S15.8.2.9_A3.js
 * @description Checking if Math.floor(x) is -0, where x is -0
 */

// CHECK#1
var x = -0;
if (Math.floor(x) !== -0)
{
	$ERROR("#1: 'var x = -0; Math.floor(x) !== -0'");
}

