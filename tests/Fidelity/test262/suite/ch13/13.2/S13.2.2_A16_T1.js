// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionExpression within a new statement is admitted
 *
 * @path ch13/13.2/S13.2.2_A16_T1.js
 * @description Using "is __obj = new function __func(){this.prop=1;}" as FunctionExpression
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __func !== "undefined") {
	$ERROR('#1: typeof __func === "undefined". Actual: typeof __func ==='+typeof __func);
}
//
//////////////////////////////////////////////////////////////////////////////

var __obj = new function __func(){this.prop=1;};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__obj.prop !== 1) {
	$ERROR('#2: __obj.prop === 1. Actual: __obj.prop ==='+__obj.prop);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (typeof __func !== "undefined") {
	$ERROR('#5: typeof __func === "undefined". Actual: typeof __func ==='+typeof __func);
}
//
//////////////////////////////////////////////////////////////////////////////

