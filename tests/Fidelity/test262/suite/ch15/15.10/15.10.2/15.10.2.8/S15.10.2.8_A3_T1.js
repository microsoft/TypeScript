// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
 * The result can be used either in a backreference (\ followed by a nonzero decimal number),
 * referenced in a replace string,
 * or returned as part of an array from the regular expression matching function
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A3_T1.js
 * @description Execute /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.exec("Learning javaScript is funny, really") and check results
 */

__executed = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.exec("Learning javaScript is funny, really");

__expected = ["javaScript is funny","javaScript","Script","funny"];
__expected.index = 9;
__expected.input = "Learning javaScript is funny, really";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/.exec("Learning javaScript is funny, really"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/.exec("Learning javaScript is funny, really"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/.exec("Learning javaScript is funny, really"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/.exec("Learning javaScript is funny, really"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


