// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Infinity is DontDelete
 *
 * @path ch15/15.1/15.1.1/15.1.1.2/S15.1.1.2_A3.1.js
 * @description Use delete
 * @noStrict
 */

// CHECK#1
if (delete Infinity !== false) {
	$ERROR('#1: delete Infinity === false. Actual: ' + (delete Infinity)); 
}

