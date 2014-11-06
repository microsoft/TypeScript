// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of boolean conversion from number value is false if the argument is +0, -0, or NaN; otherwise, is true
 *
 * @path ch09/9.2/S9.2_A4_T2.js
 * @description +0, -0 and NaN convert to Boolean by implicit transformation
 */

// CHECK#1
if (!(+0) !== true) {
  $ERROR('#1: !(+0) === true. Actual: ' + (!(+0))); 	 
}

// CHECK#2
if (!(-0) !== true) {
  $ERROR('#2: !(-0) === true. Actual: ' + (!(-0)));
}

// CHECK#3
if (!(Number.NaN) !== true) {
  $ERROR('#3: !(Number.NaN) === true. Actual: ' + (!(Number.NaN)));
}

