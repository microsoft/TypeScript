// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Array.prototype property has the attribute ReadOnly
 *
 * @path ch15/15.4/15.4.3/15.4.3.1/S15.4.3.1_A4.js
 * @description Checking if varying the Array.prototype property fails
 * @noStrict
 */

//CHECK#1
var x = Array.prototype;
Array.prototype = 1;
if (Array.prototype !== x) {
	$ERROR('#1: x = Array.prototype; Array.prototype = 1; Array.prototype === x. Actual: ' + (Array.prototype));
}


