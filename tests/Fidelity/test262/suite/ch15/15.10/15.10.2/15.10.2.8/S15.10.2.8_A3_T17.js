// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
 * The result can be used either in a backreference (\ followed by a nonzero decimal number),
 * referenced in a replace string,
 * or returned as part of an array from the regular expression matching function
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A3_T17.js
 * @description see bug http:bugzilla.mozilla.org/show_bug.cgi?id=169497
 */

__body="";
__body += '<body onXXX="alert(event.type);">\n';
__body += '<p>Kibology for all<\/p>\n';
__body += '<p>All for Kibology<\/p>\n';
__body += '<\/body>';

__html="";
__html += '<html>\n';
__html += __body;
__html += '\n<\/html>';

__executed = /<body.*>((.*\n?)*?)<\/body>/i.exec(__html);

__expected = [__body, '\n<p>Kibology for all</p>\n<p>All for Kibology</p>\n', '<p>All for Kibology</p>\n'];
__expected.index = 7;
__expected.input = __html;

//CHECK#1
if (__executed.length !== __expected.length) {
	$ERROR('#1: __executed = /<body.*>((.*\\n?)*?)<\\/body>/i.exec(__html); __executed.length === ' + __expected.length + '. Actual: ' + __executed.length);
}

//CHECK#2
if (__executed.index !== __expected.index) {
	$ERROR('#2: __executed = /<body.*>((.*\\n?)*?)<\\/body>/i.exec(__html); __executed.index === ' + __expected.index + '. Actual: ' + __executed.index);
}

//CHECK#3
if (__executed.input !== __expected.input) {
	$ERROR('#3: __executed = /<body.*>((.*\\n?)*?)<\\/body>/i.exec(__html); __executed.input === ' + __expected.input + '. Actual: ' + __executed.input);
}

//CHECK#4
for(var index=0; index<__expected.length; index++) {
	if (__executed[index] !== __expected[index]) {
		$ERROR('#4: __executed = /<body.*>((.*\\n?)*?)<\\/body>/i.exec(__html); __executed[' + index + '] === ' + __expected[index] + '. Actual: ' + __executed[index]);
	}
}


