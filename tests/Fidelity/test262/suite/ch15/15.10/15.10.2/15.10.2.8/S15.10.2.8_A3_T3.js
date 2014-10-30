// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
 * The result can be used either in a backreference (\ followed by a nonzero decimal number),
 * referenced in a replace string,
 * or returned as part of an array from the regular expression matching function
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A3_T3.js
 * @description Execute /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.test("Developing with JavaScript is dangerous, do not try it without assistance") and check results
 */

__executed = /([Jj]ava([Ss]cript)?)\sis\s(fun\w*)/.test("Developing with JavaScript is dangerous, do not try it without assistance");

//CHECK#1
if (__executed) {
	$ERROR('#1: /([Jj]ava([Ss]cript)?)\\sis\\s(fun\\w*)/.test("Developing with JavaScript is dangerous, do not try it without assistance") === false');
}


