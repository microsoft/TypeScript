// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Math.SQRT1_2 is approximately 0.7071067811865476
 *
 * @path ch15/15.8/15.8.1/15.8.1.7/S15.8.1.7_A1.js
 * @description Comparing Math.SQRT1_2 with 0.7071067811865476
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js");

// CHECK#1
if (!isEqual(Math.SQRT1_2, 0.7071067811865476)) {
  $ERROR('#1: \'Math.SQRT1_2 is not approximatley equal to  0.7071067811865476\'');
}


