// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator uses ToNumber
 *
 * @path ch09/9.5/S9.5_A3.1_T3.js
 * @description Type(x) is String
 */

// CHECK#1
if ((new String(1) << 0) !== 1) {
  $ERROR('#1: (new String(1) << 0) === 1. Actual: ' + ((new String(1) << 0)));
}

// CHECK#2
if (("-1.234" << 0) !== -1) {
  $ERROR('#2: ("-1.234" << 0) === -1. Actual: ' + (("-1.234" << 0)));
}

