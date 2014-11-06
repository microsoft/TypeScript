// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp.prototype.exec behavior depends on global property.
 * Let global is true and let I = If ToInteger(lastIndex).
 * Then if I<0 orI>length then set lastIndex to 0 and return null
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A5_T1.js
 * @description First call /(?:ab|cd)\d?/g.exec("aac1dz2233a1bz12nm444ab42"), and then First call /(?:ab|cd)\d?/g.exec("aacd22")
 */

__re = /(?:ab|cd)\d?/g;
__executed = __re.exec("aac1dz2233a1bz12nm444ab42");

__expected = ["ab4"];
__expected.index = 21;
__expected.input = "aac1dz2233a1bz12nm444ab42";

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aac1dz2233a1bz12nm444ab42"); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aac1dz2233a1bz12nm444ab42"); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aac1dz2233a1bz12nm444ab42"); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aac1dz2233a1bz12nm444ab42"); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}

__executed = __re.exec("aacd22");

//CHECK#5
if (__executed) {
	$ERROR('#5: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aacd22"); __executed === true');
}

//CHECK#6
if (__re.lastIndex !== 0) {
	$ERROR('#6: __re = /(?:ab|cd)\\d?/g; __executed = __re.exec("aacd22"); __re.lastIndex === 0. Actual: ' + (__re.lastIndex));
}


