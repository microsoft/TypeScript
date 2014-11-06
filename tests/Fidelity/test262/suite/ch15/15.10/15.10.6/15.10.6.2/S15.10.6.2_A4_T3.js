// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp.prototype.exec behavior depends on global property.
 * If global is true next exec calling start to match from lastIndex position
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A4_T3.js
 * @description Call first exec, then set re.lastIndex = void 0 and again call exec
 */

__re = /(?:ab|cd)\d?/g;

__executed = __re.exec("aacd2233ab12nm444ab42");

__expected = ["cd2"];
__expected.index = 2;
__expected.input = "aacd2233ab12nm444ab42";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}

__re.lastIndex = void 0;

__executed = __re.exec("aacd2233ab12nm444ab42");

__expected = ["cd2"];
__expected.index = 2;
__expected.input = "aacd2233ab12nm444ab42";

//CHECK#5
if (__executed.length !== __expected.length) {
	$ERROR('#5: __re = /(?:ab|cd)\\d?/g; __re.lastIndex = void 0; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#6
if (__executed.index !== __expected.index) {
	$ERROR('#6: __re = /(?:ab|cd)\\d?/g; __re.lastIndex = void 0; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#7
if (__executed.input !== __expected.input) {
	$ERROR('#7: __re = /(?:ab|cd)\\d?/g; __re.lastIndex = void 0; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#8
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#8: __re = /(?:ab|cd)\\d?/g; __re.lastIndex = void 0; __executed = __re.exec("aacd2233ab12nm444ab42"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


