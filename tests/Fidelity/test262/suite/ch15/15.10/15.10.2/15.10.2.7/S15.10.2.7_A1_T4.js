// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production QuantifierPrefix :: { DecimalDigits , DecimalDigits } evaluates as ...
 *
 * @path ch15/15.10/15.10.2/15.10.2.7/S15.10.2.7_A1_T4.js
 * @description Execute /\d{2,4}/.exec("the Fahrenheit 451 book") and check results
 */

__executed = /\d{2,4}/.exec("the Fahrenheit 451 book");

__expected = ["451"];
__expected.index = 15;
__expected.input = "the Fahrenheit 451 book";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /\\d{2,4}/.exec("the Fahrenheit 451 book"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /\\d{2,4}/.exec("the Fahrenheit 451 book"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /\\d{2,4}/.exec("the Fahrenheit 451 book"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /\\d{2,4}/.exec("the Fahrenheit 451 book"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


