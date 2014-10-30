// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Math.E is approximately 2.7182818284590452354
 *
 * @path ch15/15.8/15.8.1/15.8.1.1/S15.8.1.1_A1.js
 * @description Comparing Math.E with 2.7182818284590452354
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js");

// CHECK#1
if (!isEqual(Math.E, 2.7182818284590452354)) {
  $ERROR('#1: \'Math.E is not approximately equal to 2.7182818284590452354\'');
}

