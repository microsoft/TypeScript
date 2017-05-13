// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ''arguments'' variable overrides ActivationObject.arguments
 *
 * @path ch13/13.0/S13_A15_T5.js
 * @description Creating a variable named with "arguments" without a function
 */

THE_ANSWER="Answer to Life, the Universe, and Everything";

var arguments = THE_ANSWER;

function __func(){
    return arguments;
};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ( __func() === THE_ANSWER) {
	$ERROR('#1: __func() !== THE_ANSWER');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__func("The Ultimate Question") === "The Ultimate Question") {
	$ERROR('#2: __func("The Ultimate Question") !== "The Ultimate Question"');
}
//
//////////////////////////////////////////////////////////////////////////////

