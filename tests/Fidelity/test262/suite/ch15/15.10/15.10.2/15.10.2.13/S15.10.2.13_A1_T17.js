// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClass :: [ [lookahead \notin {^}] ClassRanges ] evaluates by evaluating ClassRanges to obtain a CharSet and returning that CharSet and the boolean false
 *
 * @path ch15/15.10/15.10.2/15.10.2.13/S15.10.2.13_A1_T17.js
 * @description Execute /[]/.exec("a[b\n[]\tc]d") and check results
 */

__executed = /[]/.exec("a[b\n[]\tc]d");

//CHECK#1
if (__executed !== null) {
	$ERROR('#1: /[]/.exec("a[b\\n[]\\tc]d") === false');
}


