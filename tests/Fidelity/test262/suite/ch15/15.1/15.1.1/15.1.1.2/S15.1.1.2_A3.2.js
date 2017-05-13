// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The Infinity is DontEnum
 *
 * @path ch15/15.1/15.1.1/15.1.1.2/S15.1.1.2_A3.2.js
 * @description Use for-in statement
 */

// CHECK#1
for (var prop in this) {
  if (prop === "Infinity") {
	$ERROR('#1: The Infinity is DontEnum');
  }	 	
}

