// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from null value is +0
 *
 * @path ch09/9.3/S9.3_A2_T1.js
 * @description null convert to Number by explicit transformation
 */

// CHECK #1
if (Number(null) !== 0) {
  $ERROR('#1.1: Number(null) === 0. Actual: ' + (Number(null))); 
} else {
  if (1/Number(null) !== Number.POSITIVE_INFINITY) {
    $ERROR('#1.2: Number(null) === +0. Actual: -0');
  }	
}

