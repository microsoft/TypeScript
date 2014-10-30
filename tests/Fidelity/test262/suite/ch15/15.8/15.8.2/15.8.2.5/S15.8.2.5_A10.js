// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y is -0 and x is -0, Math.atan2(y,x) is an implementation-dependent approximation to -PI
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A10.js
 * @description Checking if Math.atan2(-0,-0) is an approximation to -PI
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js"); 
 
// CHECK#1
//prec = 0.00000000000001;
y = -0;
x = -0;
if (!isEqual(Math.atan2(y,x), -Math.PI))
	$ERROR("#1: !isEqual(Math.atan2(-0,-0), -Math.PI)");

