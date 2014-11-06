// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production Assertion :: $ evaluates by returning an internal AssertionTester closure that takes a State argument x and performs the ...
 *
 * @path ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A1_T4.js
 * @description Execute /[^e]$/mg.exec("pairs\nmakes\tdouble") and check results
 */

__executed = /[^e]$/mg.exec("pairs\nmakes\tdouble");

__expected = ["s"];
__expected.index = 4;
__expected.input = "pairs\nmakes\tdouble";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /[^e]$/mg.exec("pairs\\nmakes\\tdouble"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /[^e]$/mg.exec("pairs\\nmakes\\tdouble"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /[^e]$/mg.exec("pairs\\nmakes\\tdouble"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /[^e]$/mg.exec("pairs\\nmakes\\tdouble"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


