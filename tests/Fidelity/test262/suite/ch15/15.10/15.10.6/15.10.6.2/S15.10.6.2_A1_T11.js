// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp.prototype.exec(string) Performs a regular expression match of ToString(string) against the regular expression and
 * returns an Array object containing the results of the match, or null if the string did not match
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A1_T11.js
 * @description String is new Number(1.012) and RegExp is /2|12/
 */

__executed = /2|12/.exec(new Number(1.012));

__expected = ["12"];
__expected.index=3;
__expected.input="1.012";

//CHECK#0
if ((__executed instanceof Array) !== true) {
	$ERROR('#0: __executed = /2|12/.exec(new Number(1.012)); (__executed instanceof Array) === true');
}

//CHECK#1
if (__executed.length !== __expected.length) {
  $ERROR('#1: __executed = /2|12/.exec(new Number(1.012)); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
  $ERROR('#2: __executed = /2|12/.exec(new Number(1.012)); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
  $ERROR('#3: __executed = /2|12/.exec(new Number(1.012)); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
  if (__executed[index] !== __expected[index]) {
    $ERROR('#4: __executed = /2|12/.exec(new Number(1.012)); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
  }
}


