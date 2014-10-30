// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ''arguments'' variable overrides ActivationObject.arguments
 *
 * @path ch13/13.0/S13_A15_T2.js
 * @description Overriding arguments within functions body
 */

THE_ANSWER="Answer to Life, the Universe, and Everything";

function __func(){
    var arguments = THE_ANSWER;
    return arguments;
};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__func(42,42,42) !== THE_ANSWER) {
	$ERROR('#1:  "arguments" variable overrides ActivationObject.arguments');
}
//
//////////////////////////////////////////////////////////////////////////////

