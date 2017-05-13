// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * "x=function y(){}" statement does not store a reference to the new function in the varaible y(Identifier)
 *
 * @path ch13/13.0/S13_A1.js
 * @description Checking the type of y
 */

var __func = function __exp__func(){return 0;};

////////////////////////////////////////////////
// //////////////////////////////
//CHECK#1
if (typeof __func !== "function") {
	$ERROR('#1: typeof __func === "function". Actual: typeof __func ==='+typeof __func);
}
//
//////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (typeof __exp__func !== "undefined"){
    $ERROR('#2: typeof __exp__func === "undefined". Actual: typeof __exp__func ==='+typeof __exp__func);
}
//
//////////////////////////////////////////////////////////////////////////////

