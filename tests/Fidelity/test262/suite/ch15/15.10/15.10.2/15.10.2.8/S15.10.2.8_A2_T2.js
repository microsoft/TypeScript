// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The form (?! Disjunction ) specifies a zero-width negative lookahead.
 * In order for it to succeed, the pattern inside Disjunction must fail to match at the current position.
 * The current position is not advanced before matching the sequel
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A2_T2.js
 * @description Execute /Java(?!Script)([A-Z]\w*)/.exec("using of JavaBeans technology") and check results
 */

__executed = /Java(?!Script)([A-Z]\w*)/.exec("using of JavaBeans technology");

__expected = ["JavaBeans", "Beans"];
__expected.index = 9;
__expected.input = "using of JavaBeans technology";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /Java(?!Script)([A-Z]\\w*)/.exec("using of JavaBeans technology"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /Java(?!Script)([A-Z]\\w*)/.exec("using of JavaBeans technology"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /Java(?!Script)([A-Z]\\w*)/.exec("using of JavaBeans technology"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /Java(?!Script)([A-Z]\\w*)/.exec("using of JavaBeans technology"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


