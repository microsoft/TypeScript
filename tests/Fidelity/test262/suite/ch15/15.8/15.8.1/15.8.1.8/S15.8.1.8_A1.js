// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Math.SQRT2 is approximately 1.4142135623730951
 *
 * @path ch15/15.8/15.8.1/15.8.1.8/S15.8.1.8_A1.js
 * @description Comparing Math.SQRT2 with 1.4142135623730951
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js");

// CHECK#1
if (!isEqual(Math.SQRT2, 1.4142135623730951)) {
  $ERROR('#1: \'Math.SQRT2 is not approximatley equal to 1.4142135623730951\'');
}


