// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Parentheses of the form ( Disjunction ) serve both to group the components of the Disjunction pattern together and to save the result of the match.
 * The result can be used either in a backreference (\ followed by a nonzero decimal number),
 * referenced in a replace string,
 * or returned as part of an array from the regular expression matching function
 *
 * @path ch15/15.10/15.10.2/15.10.2.8/S15.10.2.8_A3_T18.js
 * @description see bug  http:bugzilla.mozilla.org/show_bug.cgi?id=169534
 */

__replaced = "To sign up click |here|https:www.xxxx.org/subscribe.htm|".replace(/(\|)([\w\x81-\xff ]*)(\|)([\/a-z][\w:\/\.]*\.[a-z]{3,4})(\|)/ig, '<a href="$4">$2</a>');

__expected = 'To sign up click <a href="https:www.xxxx.org/subscribe.htm">here</a>';

//CHECK#1
if (__replaced !== __expected) {
	$ERROR('#1: __replaced = "To sign up click |here|https:www.xxxx.org/subscribe.htm|".replace(/(\\|)([\\w\\x81-\\xff ]*)(\\|)([\\/a-z][\\w:\\/\\.]*\\.[a-z]{3,4})(\\|)/ig, \'<a href="$4">$2</a>\'); __replaced === ' + __expected + '. Actual: ' + __replaced);
}


