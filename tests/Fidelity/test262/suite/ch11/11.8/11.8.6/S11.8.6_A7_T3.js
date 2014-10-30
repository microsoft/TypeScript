// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When "instanceof" returns true it means that GetValue(RelationalExpression) is constructed with ShiftExpression
 *
 * @path ch11/11.8/11.8.6/S11.8.6_A7_T3.js
 * @description Checking Function object
 */

var __func = new Function;

//CHECK#1
if (!(__func instanceof Function)) {
	$ERROR('#1: If instanceof returns true then GetValue(RelationalExpression) was constructed with ShiftExpression');
}

//CHECK#2
if (__func.constructor !== Function) {
	$ERROR('#2: If instanceof returns true then GetValue(RelationalExpression) was constructed with ShiftExpression');
}


