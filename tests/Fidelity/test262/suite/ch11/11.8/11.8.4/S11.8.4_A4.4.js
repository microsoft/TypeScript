// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If either x or y is +0 and the other is -0, return true
 *
 * @path ch11/11.8/11.8.4/S11.8.4_A4.4.js
 * @description Checking all combinations
 */

//CHECK#1
if ((0 >= 0) !== true) {
  $ERROR('#1: (0 >= 0) === true');
}

//CHECK#2
if ((-0 >= -0) !== true) {
  $ERROR('#2: (-0 >= -0) === true');
}

//CHECK#3
if ((+0 >= -0) !== true) {
  $ERROR('#3: (+0 >= -0) === true');
}

//CHECK#4
if ((-0 >= +0) !== true) {
  $ERROR('#4: (-0 >= +0) === true');
}


