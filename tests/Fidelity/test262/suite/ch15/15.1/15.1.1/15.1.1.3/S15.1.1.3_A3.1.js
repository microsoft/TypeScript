// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The undefined is DontDelete
 *
 * @path ch15/15.1/15.1.1/15.1.1.3/S15.1.1.3_A3.1.js
 * @description Use delete
 * @noStrict
 */

// CHECK#1
if (delete undefined !== false) {
	$ERROR('#1: delete undefined === false. Actual: ' + (delete undefined)); 
}

