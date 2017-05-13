// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ''arguments'' variable overrides ActivationObject.arguments
 *
 * @path ch13/13.0/S13_A15_T3.js
 * @description Declaring a variable named with "arguments" without a function
 */

THE_ANSWER="Answer to Life, the Universe, and Everything";

var arguments = THE_ANSWER;

function __func(arguments){
    return arguments;
    
};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __func() !== "undefined") {
	$ERROR('#1: typeof __func() === "undefined". Actual: typeof __func() ==='+typeof __func());
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__func("The Ultimate Question") !== "The Ultimate Question") {
	$ERROR('#2: __func("The Ultimate Question") === "The Ultimate Question". Actual: __func("The Ultimate Question")==='+__func("The Ultimate Question"));
}
//
//////////////////////////////////////////////////////////////////////////////

