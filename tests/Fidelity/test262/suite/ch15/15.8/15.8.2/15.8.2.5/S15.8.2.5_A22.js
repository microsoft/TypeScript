// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y is equal to -Infinity and x is equal to +Infinity, Math.atan2(y,x) is an implementation-dependent approximation to -PI/4
 *
 * @path ch15/15.8/15.8.2/15.8.2.5/S15.8.2.5_A22.js
 * @description Checking if Math.atan2(y,x) is an approximation to -PI/4, where y is equal to -Infinity and x is equal to +Infinity
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js"); 

// CHECK#1
//prec = 0.00000000000001;
y = -Infinity;
x = +Infinity;

if (!isEqual(Math.atan2(y,x),- (Math.PI)/4))
	$ERROR("#1: Math.abs(Math.atan2(" + y + ", " + x + ") + (Math.PI/4)) >= " + prec);

