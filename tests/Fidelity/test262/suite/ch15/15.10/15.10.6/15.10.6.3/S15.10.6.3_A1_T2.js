// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Equivalent to the expression RegExp.prototype.exec(string) != null
 *
 * @path ch15/15.10/15.10.6/15.10.6.3/S15.10.6.3_A1_T2.js
 * @description RegExp is /((1)|(12))((3)|(23))/ and tested string is new String("123")
 */

var __string = new String("123");
__re = /((1)|(12))((3)|(23))/;

//CHECK#0
if (__re.test(__string) !== (__re.exec(__string) !== null)) {
	$ERROR('#0: var __string = new String("123"); __re = /((1)|(12))((3)|(23))/; __re.test(__string) === (__re.exec(__string) !== null)');
}


