// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator uses floor, abs
 *
 * @path ch09/9.5/S9.5_A3.2_T1.js
 * @description Use operator <<0
 */

// CHECK#1
if ((1.2345 << 0) !== 1) {
  $ERROR('#1: (1.2345 << 0) === 1. Actual: ' + ((1.2345 << 0)));
}

// CHECK#2
if ((-5.4321 << 0) !== -5) {
  $ERROR('#2: (-5.4321 << 0) === -5. Actual: ' + ((-5.4321 << 0)));
}

