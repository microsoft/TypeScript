// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Variables are defined with global scope (that is, they are created as members of the global object, as described in 10.1.3) using property attributes { DontDelete}
 *
 * @path ch12/12.2/S12.2_A2.js
 * @description Checking if deleting global variables that have the attributes {DontDelete} fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (delete(__variable)) {
	$ERROR('#1: delete(__variable)===false');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (delete(this["__variable"])) {
	$ERROR('#2: delete(this["__variable"])===false');
}
//
//////////////////////////////////////////////////////////////////////////////


var __variable;
var __variable = "defined";

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (delete(__variable) | delete(this["__variable"])) {
	$ERROR('#3: (delete(__variable) | delete(this["__variable"]))===false' );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if ((__variable !== "defined")|(this["__variable"] !=="defined")) {
	$ERROR('#4: __variable === "defined" and this["__variable"] ==="defined"');
}
//
//////////////////////////////////////////////////////////////////////////////


