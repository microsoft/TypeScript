// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Math.PI is approximately 3.1415926535897932
 *
 * @path ch15/15.8/15.8.1/15.8.1.6/S15.8.1.6_A1.js
 * @description Comparing Math.PI with 3.1415926535897932
 */

$INCLUDE("math_precision.js");
$INCLUDE("math_isequal.js");

// CHECK#1
if (!isEqual(Math.PI, 3.1415926535897932)) {
  $ERROR('#1: \'Math.PI is not approximatley equal to 3.1415926535897932\'');
}


