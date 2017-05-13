// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * let P be ToString(pattern) and let F be ToString(flags)
 *
 * @path ch15/15.10/15.10.4/S15.10.4.1_A8_T13.js
 * @description Pattern is "1" and flags is {toString:function(){throw "intostr";} }
 */

//CHECK#1
try {
	$ERROR('#1.1: new RegExp("1", {toString:function(){throw "intostr";}}) throw "intostr". Actual: ' + (new RegExp("1", {toString:function(){throw "intostr";}})));
} catch (e) {
	if (e !== "intostr" ) {
		$ERROR('#1.2: new RegExp("1", {toString:function(){throw "intostr";}}) throw "intostr". Actual: ' + (e));
	}
}


