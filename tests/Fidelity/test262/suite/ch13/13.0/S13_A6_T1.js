// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FunctionDeclaration can be overrided by other FunctionDeclaration with the same Identifier
 *
 * @path ch13/13.0/S13_A6_T1.js
 * @description Duplicating function declaration
 */

function __func(){return 1};
 
var __store__func = __func;
 
var __1 = __func();
 
 function __func(){return 'A'};
 
var __A = __func();
 
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__store__func !== __func) {
	$ERROR('#1: __store__func === __func. Actual: __store__func ==='+__store__func);
}
//
////////////////////////////////////////////////////////////////////////////// 
 
//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__1 !== __A) {
	$ERROR('#2: __1 === __A. Actual: __1 ==='+__1);
}
//
//////////////////////////////////////////////////////////////////////////////

