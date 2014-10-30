// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The "while" Statement is evaluted according to 12.6.2 and returns (normal, V, empty)
 *
 * @path ch12/12.6/12.6.2/S12.6.2_A7.js
 * @description using eval
 */

var __condition=0

__evaluated = eval("while (__condition<5) eval(\"__condition++\");");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__condition !== 5) {
	$ERROR('#1: The "while" statement is evaluated as described in the Standard');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__evaluated !== 4) {
	$ERROR('#2: The "while" statement returns (normal, V, empty)');
}
//
//////////////////////////////////////////////////////////////////////////////


