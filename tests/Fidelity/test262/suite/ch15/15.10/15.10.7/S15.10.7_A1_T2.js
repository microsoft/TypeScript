// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegExp instance has not [[call]] property
 *
 * @path ch15/15.10/15.10.7/S15.10.7_A1_T2.js
 * @description Checking if call of RegExp("a|b","g")() fails
 */

//CHECK#1
try {
  $ERROR('#1.1: RegExp("a|b","g")() throw TypeError. Actual: ' + (RegExp("a|b","g")()));
} catch (e) {
  if ((e instanceof TypeError) !== true) {
    $ERROR('#1.2: RegExp("a|b","g")() throw TypeError. Actual: ' + (e));
  }
}



