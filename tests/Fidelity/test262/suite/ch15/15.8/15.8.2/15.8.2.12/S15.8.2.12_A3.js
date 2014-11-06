// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * +0 is considered to be larger than -0
 *
 * @path ch15/15.8/15.8.2/15.8.2.12/S15.8.2.12_A3.js
 * @description Checking if Math.max(-0,+0) and Math.max(+0,-0) equals to -0
 */

// CHECK#1
if (Math.max(-0, +0) !== -0)
{
	$ERROR("#1: 'Math.max(-0, +0) !== -0'");
}

// CHECK#1
if (Math.max(+0, -0) !== -0)
{
	$ERROR("#2: 'Math.max(+0, -0) !== -0'");
}

