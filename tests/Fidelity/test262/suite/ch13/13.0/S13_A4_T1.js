// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production FunctionDeclaration: "function Identifier ( FormalParameterList_opt ) { FunctionBody }" is processed by function declarations
 *
 * @path ch13/13.0/S13_A4_T1.js
 * @description Declaring a function that returns string
 */

function __func(){return "zig-zig-sputnik";};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1 
if (typeof __func !== "function") {
	$ERROR('#1: typeof __func === "function". Actual: typeof __func ==='+typeof __func);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__func() !== "zig-zig-sputnik") {
	$ERROR('#2: __func() === "zig-zig-sputnik". Actual: __func() ==='+__func());
}
//
//////////////////////////////////////////////////////////////////////////////

