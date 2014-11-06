// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Array has property prototype
 *
 * @path ch15/15.4/15.4.3/15.4.3.1/S15.4.3.1_A1.js
 * @description Checking use hasOwnProperty
 */

//CHECK#1
if (Array.hasOwnProperty('prototype') !== true) {
	$FAIL('#1: Array.hasOwnProperty(\'prototype\') === true. Actual: ' + (Array.hasOwnProperty('prototype')));
}


