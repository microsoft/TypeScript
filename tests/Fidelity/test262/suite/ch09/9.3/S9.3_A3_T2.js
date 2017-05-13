// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of number conversion from boolean value is 1 if the argument is true, else is +0
 *
 * @path ch09/9.3/S9.3_A3_T2.js
 * @description False and true convert to Number by implicit transformation
 */

// CHECK#1
if (+(false) !== +0) {
  $ERROR('#1.1: +(false) === 0. Actual: ' + (+(false)));
} else {
  if (1/+(false) !== Number.POSITIVE_INFINITY) {
    $ERROR('#1.2: +(false) === +0. Actual: -0');
  }
}

// CHECK#2
if (+(true) !== 1) {
  $ERROR('#2: +(true) === 1. Actual: ' + (+(true)));	
}

