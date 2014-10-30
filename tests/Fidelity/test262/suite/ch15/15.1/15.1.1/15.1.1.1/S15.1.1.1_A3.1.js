// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The NaN is DontDelete
 *
 * @path ch15/15.1/15.1.1/15.1.1.1/S15.1.1.1_A3.1.js
 * @description Use delete
 * @noStrict
 */

// CHECK#1
if (delete NaN !== false) {
	$ERROR('#1: delete NaN === false. Actual: ' + (delete NaN)); 	
}

