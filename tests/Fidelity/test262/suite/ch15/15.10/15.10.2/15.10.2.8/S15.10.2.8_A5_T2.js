// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * In case-insignificant matches all characters are implicitly converted to upper case immediately before they are compared
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A5_T2.js
 * @description Execute /[a-z]+/.exec("ABC def ghi") and check results
 */

__string = "ABC def ghi";
__executed = /[a-z]+/.exec(__string);

__expected = ["def"];
__expected.index = 4;
__expected.input = __string;

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __string = "ABC def ghi"; __executed = /[a-z]+/.exec(__string); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __string = "ABC def ghi"; __executed = /[a-z]+/.exec(__string); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __string = "ABC def ghi"; __executed = /[a-z]+/.exec(__string); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __string = "ABC def ghi"; __executed = /[a-z]+/.exec(__string); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


