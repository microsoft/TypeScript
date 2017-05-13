// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * ToInt32 returns values between -2^31 and 2^31-1
 *
 * @path ch09/9.5/S9.5_A2.1_T2.js
 * @description Converting some numbers, which are in\outside of Int32 scopes, with  ~ operator
 */

// CHECK#1
if (~-2147483649 !== ~2147483647) {
  $ERROR('#1: ~-2147483649 === ~2147483647');
}

// CHECK#2
if (~-4294967296 !== ~0) {
  $ERROR('#2: ~-4294967296 === ~0');
}

// CHECK#3
if (~2147483648 !== ~-2147483648) {
  $ERROR('#3: ~2147483648 === ~-2147483648');
}

// CHECK#4
if (~4294967296 !== ~0) {
  $ERROR('#4: ~4294967296 === ~0');
}

