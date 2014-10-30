// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator uses ToNumber
 *
 * @path ch09/9.7/S9.7_A3.1_T2.js
 * @description Type(x) is Number
 */

// CHECK#1
if (String.fromCharCode(new Number(1)).charCodeAt(0) !== 1) {
  $ERROR('#1: String.fromCharCode(new Number(1)).charCodeAt(0) === 1. Actual: ' + (String.fromCharCode(new Number(1)).charCodeAt(0)));
}

// CHECK#2
if (String.fromCharCode(-1.234).charCodeAt(0) !== 65535) {
  $ERROR('#2: String.fromCharCode(-1.234).charCodeAt(0) === 65535. Actual: ' + (String.fromCharCode(-1.234).charCodeAt(0)));
}

