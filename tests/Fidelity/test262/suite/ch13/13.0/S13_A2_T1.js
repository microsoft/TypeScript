// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * function must be evaluated inside the expression
 *
 * @path ch13/13.0/S13_A2_T1.js
 * @description Defining function body with "return arg"
 */

var x = (function __func(arg){return arg})(1);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (x !== 1) {
	$ERROR('#1: x === 1. Actual: x ==='+x);
}

//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (typeof __func !== 'undefined') {
	$ERROR('#2: typeof __func === \'undefined\'. Actual: typeof __func ==='+typeof __func);
}
//
//////////////////////////////////////////////////////////////////////////////

