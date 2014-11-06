// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production Assertion :: \B evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the ...
 *
 * @path ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A4_T5.js
 * @description Execute /\w\B/.exec("devils arise\tfor\nevil") and check results
 */

__executed = /\w\B/.exec("devils arise\tfor\nrevil");

__expected = ["d"];
__expected.index = 0;
__expected.input = "devils arise\tfor\nrevil";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /\\w\\B/.exec("devils arise\\tfor\\nrevil"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /\\w\\B/.exec("devils arise\\tfor\\nrevil"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /\\w\\B/.exec("devils arise\\tfor\\nrevil"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /\\w\\B/.exec("devils arise\\tfor\\nrevil"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


