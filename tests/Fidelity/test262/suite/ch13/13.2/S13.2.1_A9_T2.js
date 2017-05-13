// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When the [[Call]] property for a Function object is called,
 * the body is evaluated and if evaluation result has type "return" its value is not defined, then "undefined" is returned
 *
 * @path ch13/13.2/S13.2.1_A9_T2.js
 * @description Using "return" with no expression. Declaring a function with "var __func = function()"
 */

var x; 

var __func = function(){
    x = 1;
    return;
}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func() !== undefined) {
	$ERROR('#1: __func() === undefined. Actual: __func() ==='+__func());
};
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (x!==1) {
	$ERROR('#2: x === 1. Actual: x === '+x);
}
//
//////////////////////////////////////////////////////////////////////////////

