// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp.prototype.exec(string) Performs a regular expression match of ToString(string) against the regular expression and
 * returns an Array object containing the results of the match, or null if the string did not match
 *
 * @path ch15/15.10/15.10.6/15.10.6.2/S15.10.6.2_A1_T13.js
 * @description String is true and RegExp is /t[a-b|q-s]/
 */

__executed = /t[a-b|q-s]/.exec(true);

__expected = ["tr"];
__expected.index=0;
__expected.input="true";

//CHECK#0
if ((__executed instanceof Array) !== true) {
	$ERROR('#0: __executed = /t[a-b|q-s]/.exec(true); (__executed instanceof Array) === true');
}

//CHECK#1
if (__executed.length !== __expected.length) {
  $ERROR('#1: __executed = /t[a-b|q-s]/.exec(true); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
  $ERROR('#2: __executed = /t[a-b|q-s]/.exec(true); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
  $ERROR('#3: __executed = /t[a-b|q-s]/.exec(true); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
  if (__executed[index] !== __expected[index]) {
    $ERROR('#4: __executed = /t[a-b|q-s]/.exec(true); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
  }
}


