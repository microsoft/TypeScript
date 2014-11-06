// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ToUint32 returns values between 0 and 2^32-1
 *
 * @path ch09/9.6/S9.6_A2.1.js
 * @description Converting numbers, which are in\outside of Uint32 scopes, with >>>0 operator
 */

// CHECK#1
if ((0 >>> 0) !== 0) {
  $ERROR('#1: (0 >>> 0) === 0. Actual: ' + ((0 >>> 0)));
}

// CHECK#2
if ((1 >>> 0) !== 1) {
  $ERROR('#2: (1 >>> 0) === 1. Actual: ' + ((1 >>> 0)));
}

// CHECK#3
if ((-1 >>> 0) !== 4294967295) {
  $ERROR('#3: (-1 >>> 0) === 4294967295. Actual: ' + ((-1 >>> 0)));
}

// CHECK#4
if ((4294967295 >>> 0) !== 4294967295) {
  $ERROR('#4: (4294967295 >>> 0) === 4294967295. Actual: ' + ((4294967295 >>> 0)));
}

// CHECK#5
if ((4294967294 >>> 0) !== 4294967294) {
  $ERROR('#5: (4294967294 >>> 0) === 4294967294. Actual: ' + ((4294967294 >>> 0)));
}

// CHECK#6
if ((4294967296 >>> 0) !== 0) {
  $ERROR('#6: (4294967296 >>> 0) === 0. Actual: ' + ((4294967296 >>> 0)));
}

