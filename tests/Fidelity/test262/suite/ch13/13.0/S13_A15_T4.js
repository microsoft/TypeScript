// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ''arguments'' variable overrides ActivationObject.arguments
 *
 * @path ch13/13.0/S13_A15_T4.js
 * @description Declaring a variable named with "arguments" and following a "return" statement within a function body
 */

THE_ANSWER="Answer to Life, the Universe, and Everything";

function __func(){
    return typeof arguments;
    var arguments = THE_ANSWER;
};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func(42,42,42) !== "object") {
	$ERROR('#1: __func(42,42,42) === "object". Actual: __func(42,42,42)==='+__func(42,42,42));
}
//
//////////////////////////////////////////////////////////////////////////////

