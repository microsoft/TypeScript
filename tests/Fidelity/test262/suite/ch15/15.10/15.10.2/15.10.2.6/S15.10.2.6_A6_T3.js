// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Assertions in combination
 *
 * @path ch15/15.10/15.10.2/15.10.2.6/S15.10.2.6_A6_T3.js
 * @description while asterix is non greedy it is run till matches end or colon
 */

__executed = /^.*?(:|$)/.exec("Hello: World");

__expected = ["Hello:", ":"];
__expected.index = 0;
__expected.input = "Hello: World";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /^.*?(:|$)/.exec("Hello: World"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /^.*?(:|$)/.exec("Hello: World"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /^.*?(:|$)/.exec("Hello: World"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /^.*?(:|$)/.exec("Hello: World"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


