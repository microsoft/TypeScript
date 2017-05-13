// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If value is NaN, +0, -0, +Infinity, or -Infinity, return +0
 *
 * @path ch09/9.7/S9.7_A1.js
 * @description For testing use String.fromCharCode(Number).charCodeAt(0) construction
 */

// CHECK#1
if (String.fromCharCode(Number.NaN).charCodeAt(0) !== +0) {
  $ERROR('#1.1: String.fromCharCode(Number.NaN).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(Number.NaN).charCodeAt(0)));
} else if (1/String.fromCharCode(Number.NaN).charCodeAt(0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#1.2: String.fromCharCode(Number.NaN).charCodeAt(0) === +0. Actual: -0');
}

// CHECK#2
if (String.fromCharCode(Number("abc")).charCodeAt(0) !== +0) {
  $ERROR('#2.1: String.fromCharCode(Number("abc")).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(Number("abc")).charCodeAt(0)));
} else if (1/String.fromCharCode(0).charCodeAt(0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#2.2: String.fromCharCode(0).charCodeAt(0) === +0. Actual: -0');
}

// CHECK#3
if (String.fromCharCode(0).charCodeAt(0) !== +0) {
  $ERROR('#3.1: String.fromCharCode(0).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(0).charCodeAt(0)));
} else if (1/String.fromCharCode(0).charCodeAt(0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#3.2: String.fromCharCode(0).charCodeAt(0) === +0. Actual: -0');
}

// CHECK#4
if (String.fromCharCode(-0).charCodeAt(0) !== +0) {
  $ERROR("#4.1: String.fromCharCode(-0).charCodeAt(0) === +0");
} else if (1/String.fromCharCode(-0).charCodeAt(0) !== Number.POSITIVE_INFINITY) {
  $ERROR("#4.2: String.fromCharCode(-0).charCodeAt(0) === +0. Actual: -0");
}

// CHECK#5
if (String.fromCharCode(Number.POSITIVE_INFINITY).charCodeAt(0) !== +0) {
  $ERROR('#5.1: String.fromCharCode(Number.POSITIVE_INFINITY).charCodeAt(0) === 0. Actual: ' + (String.fromCharCode(Number.POSITIVE_INFINITY).charCodeAt(0)));
} else if (1/String.fromCharCode(Number.POSITIVE_INFINITY).charCodeAt(0) !== Number.POSITIVE_INFINITY) {
  $ERROR('#5.2: String.fromCharCode(Number.POSITIVE_INFINITY).charCodeAt(0) === +0. Actual: -0');
}

// CHECK#6
if (String.fromCharCode(Number.NEGATIVE_INFINITY).charCodeAt(0) !== +0) {
  $ERROR("#6.1: String.fromCharCode(Number.NEGATIVE_INFINITY).charCodeAt(0) === +0");
} else if (1/String.fromCharCode(Number.NEGATIVE_INFINITY).charCodeAt(0) !== Number.POSITIVE_INFINITY) {
  $ERROR("#6.2: String.fromCharCode(Number.NEGATIVE_INFINITY).charCodeAt(0) === +0. Actual: -0");
}



