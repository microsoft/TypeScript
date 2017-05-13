// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Number.POSITIVE_INFINITY is ReadOnly
 *
 * @path ch15/15.7/15.7.3/15.7.3.6/S15.7.3.6_A2.js
 * @description Checking if varying Number.POSITIVE_INFINITY fails
 */

// CHECK#1
Number.POSITIVE_INFINITY = 1;
if (isFinite(Number.POSITIVE_INFINITY)) {
  $ERROR('#1: Number.POSITIVE_INFINITY = 1; Number.POSITIVE_INFINITY === +Infinity');
} else { 
  if (Number.POSITIVE_INFINITY <= 0) {
    $ERROR('#1: Number.POSITIVE_INFINITY = 1; Number.POSITIVE_INFINITY === +Infinity');
  }
}

