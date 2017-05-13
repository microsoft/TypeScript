// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "do-while" Statement is evaluted according to 12.6.1 and returns (normal, V, empty)
 *
 * @path ch12/12.6/12.6.1/S12.6.1_A7.js
 * @description Using eval
 */

var __condition=0

__evaluated = eval("do eval(\"__condition++\"); while (__condition<5)");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__condition !== 5) {
	$ERROR('#1: The "do-while" statement is evaluted according to the Standard ');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__evaluated !== 4) {
	$ERROR('#2: The "do-while" statement returns (normal, V, empty)');
}
//
//////////////////////////////////////////////////////////////////////////////


