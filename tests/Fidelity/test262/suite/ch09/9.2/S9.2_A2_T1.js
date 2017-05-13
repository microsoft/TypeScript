// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of boolean conversion from null value is false
 *
 * @path ch09/9.2/S9.2_A2_T1.js
 * @description null convert to Boolean by explicit transformation
 */

// CHECK#1
if (Boolean(null) !== false) {
  $ERROR('#1: Boolean(null) === false. Actual: ' + (Boolean(null))); 
}

