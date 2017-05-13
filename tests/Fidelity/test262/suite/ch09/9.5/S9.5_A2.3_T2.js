// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If result is greater than or equal to 2^31, return result -2^32
 *
 * @path ch09/9.5/S9.5_A2.3_T2.js
 * @description Use operator ~
 */

// CHECK#1
if (~2147483647 !== -2147483648) {
  $ERROR('#1: ~2147483647 ==== -2147483648)');
}

// CHECK#2
if (~2147483648 !== ~-2147483648) {
  $ERROR('#2: ~2147483648 ==== ~-2147483648)');
}

// CHECK#3
if (~2147483649 !== ~-2147483647) {
  $ERROR('#3: ~2147483649 ==== ~-2147483647)');
}

// CHECK#4
if (~4294967295 !== ~-1) {
  $ERROR('#4: ~4294967295 ==== ~-1)');
}

// CHECK#5
if (~4294967296 !== ~0) {
  $ERROR('#5: ~4294967296 ==== ~0)');
}

// CHECK#6
if (~4294967297 !== ~1) {
  $ERROR('#6: ~4294967297 ==== ~1)');
}

