// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ] evaluates by evaluating ClassRanges to obtain a CharSet and returning that CharSet and the boolean false
 *
 * @path ch15/15.10/15.10.2/15.10.2.13/S15.10.2.13_A1_T15.js
 * @description Execute /[\d][\n][^\d]/.exec("line1\nline2") and check results
 */

__executed = /[\d][\n][^\d]/.exec("line1\nline2");

__expected = ["1\nl"];
__expected.index = 4;
__expected.input = "line1\nline2";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /[\\d][\\n][^\\d]/.exec("line1\\nline2"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /[\\d][\\n][^\\d]/.exec("line1\\nline2"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /[\\d][\\n][^\\d]/.exec("line1\\nline2"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /[\\d][\\n][^\\d]/.exec("line1\\nline2"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


