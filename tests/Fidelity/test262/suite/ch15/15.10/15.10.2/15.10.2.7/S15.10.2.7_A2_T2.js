// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * i) The production QuantifierPrefix :: { DecimalDigits } evaluates...
 * ii) The production QuantifierPrefix :: ? evaluates by returning the two results 0 and 1
 *
 * @path ch15/15.10/15.10.2/15.10.2.7/S15.10.2.7_A2_T2.js
 * @description Execute /\w{3}\d?/.exec("CELL\uFFDDbox127") and check results
 */

__executed = /\w{3}\d?/.exec("CELL\uFFDDbox127");

__expected = ["CEL"];
__expected.index = 0;
__expected.input = "CELL\uFFDDbox127";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /\\w{3}\\d?/.exec("CELL\\uFFDDbox127"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /\\w{3}\\d?/.exec("CELL\\uFFDDbox127"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /\\w{3}\\d?/.exec("CELL\\uFFDDbox127"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /\\w{3}\\d?/.exec("CELL\\uFFDDbox127"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


