// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Equivalent to the expression RegExp.prototype.exec(string) != null
 *
 * @path ch15/15.10/15.10.6/15.10.6.3/S15.10.6.3_A1_T21.js
 * @description RegExp is /[a-z]n/ and tested string is x, where x is function(){}()
 */

__re = /[a-z]n/;

//CHECK#0
if (__re.test(function(){}()) !== (__re.exec(function(){}()) !== null)) {
	$ERROR('#0: __re = /[a-z]n/; __re.test(function(){}()) === (__re.exec(function(){}()) !== null)');
}


