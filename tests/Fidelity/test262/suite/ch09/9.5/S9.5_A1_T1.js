// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If value is NaN, +0, -0, +Infinity, or -Infinity, return +0
 *
 * @path ch09/9.5/S9.5_A1_T1.js
 * @description For testing use operator <<0
 */

// CHECK#1
if ((Number.NaN << 0) !== +0) {
  $ERROR('#1.1: (Number.NaN << 0) === 0. Actual: ' + ((Number.NaN << 0)));
} else if (1/(Number.NaN << 0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#1.2: (Number.NaN << 0) === +0. Actual: -0');
}

// CHECK#2
if ((Number("abc") << 0) !== +0) {
  $ERROR('#2.1: (Number("abc") << 0) === 0. Actual: ' + ((Number("abc") << 0)));
} else if (1/(0 << 0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#2.2: (0 << 0) === +0. Actual: -0');
}

// CHECK#3
if ((0 << 0) !== +0) {
  $ERROR('#3.1: (0 << 0) === 0. Actual: ' + ((0 << 0)));
} else if (1/(0 << 0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#3.2: (0 << 0) === +0. Actual: -0');
}

// CHECK#4
if ((-0 << 0) !== +0) {
  $ERROR("#4.1: (-0 << 0) === 0");
} else if (1/(-0 << 0) !== Number.POSITIVE_INFINITY) {
  $ERROR("#4.2: (-0 << 0) === +0. Actual: -0");
}

// CHECK#5
if ((Number.POSITIVE_INFINITY << 0) !== +0) {
  $ERROR('#5.1: (Number.POSITIVE_INFINITY << 0) === 0. Actual: ' + ((Number.POSITIVE_INFINITY << 0)));
} else if (1/(Number.POSITIVE_INFINITY << 0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#5.2: (Number.POSITIVE_INFINITY << 0) === +0. Actual: -0');
}

// CHECK#6
if ((Number.NEGATIVE_INFINITY << 0) !== +0) {
  $ERROR("#6.1: (Number.NEGATIVE_INFINITY << 0) === 0");
} else if (1/(Number.NEGATIVE_INFINITY << 0) !== Number.POSITIVE_INFINITY) {
  $ERROR("#6.2: (Number.NEGATIVE_INFINITY << 0) === +0. Actual: -0");
}

