// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production QuantifierPrefix :: { DecimalDigits , }evaluates as follows:
 * i) Let i be the MV of DecimalDigits
 * ii) Return the two results i and \infty
 *
 * @path ch15/15.10/15.10.2/15.10.2.7/S15.10.2.7_A6_T4.js
 * @description Execute /(123){1,}/.exec("123123") and check results
 */

__executed = /(123){1,}/.exec("123123");

__expected = ["123123","123"];
__expected.index = 0;
__expected.input = "123123";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /(123){1,}/.exec("123123"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /(123){1,}/.exec("123123"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /(123){1,}/.exec("123123"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /(123){1,}/.exec("123123"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


