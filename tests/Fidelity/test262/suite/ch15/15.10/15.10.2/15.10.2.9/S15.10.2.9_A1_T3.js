// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * An escape sequence of the form \ followed by a nonzero decimal number n matches the result of the nth set of capturing parentheses (see 15.10.2.11)
 *
 * @path ch15/15.10/15.10.2/15.10.2.9/S15.10.2.9_A1_T3.js
 * @description Execute /([xu]\d{2}([A-H]{2})?)\1/.exec("x09x12x01x05u00FFu00FFx04x04x23") and check results
 */

__executed = /([xu]\d{2}([A-H]{2})?)\1/.exec("x09x12x01x05u00FFu00FFx04x04x23");

__expected = ["u00FFu00FF", "u00FF", "FF"];
__expected.index = 12;
__expected.input = "x09x12x01x05u00FFu00FFx04x04x23";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /([xu]\\d{2}([A-H]{2})?)\\1/.exec("x09x12x01x05u00FFu00FFx04x04x23"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /([xu]\\d{2}([A-H]{2})?)\\1/.exec("x09x12x01x05u00FFu00FFx04x04x23"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /([xu]\\d{2}([A-H]{2})?)\\1/.exec("x09x12x01x05u00FFu00FFx04x04x23"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /([xu]\\d{2}([A-H]{2})?)\\1/.exec("x09x12x01x05u00FFu00FFx04x04x23"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


