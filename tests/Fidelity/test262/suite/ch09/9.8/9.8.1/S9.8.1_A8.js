// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If 1 > s > -1, and -6 < n <= 0, return the string consisting of the
 * character '0', followed by a decimal point '.', followed by -n occurrences
 * of the character '0', followed by the k digits of the decimal
 * representation of s
 *
 * @path ch09/9.8/9.8.1/S9.8.1_A8.js
 * @description Various float numbers convert to String by explicit transformation
 */

// CHECK#1
if (String(0.1) !== "0.1") {
  $ERROR('#1: String(0.1) === "0.1". Actual: ' + (String(0.1)));
}

// CHECK#2
if (String(0.000001) !== "0.000001") {
  $ERROR('#2: String(0.000001) === "0.000001". Actual: ' + (String(0.000001)));
}

// CHECK#3
if (String(1e-6) !== "0.000001") {
  $ERROR('#3: String(1e-6) === "0.000001". Actual: ' + (String(1e-6)));
}

// CHECK#4
if (String(1E-6) !== "0.000001") {
  $ERROR('#4: String(1E-6) === "0.000001". Actual: ' + (String(1E-6)));
}

// CHECK#5
if (String(-0.1) !== "-0.1") {
  $ERROR('#5: String(-0.1) === "-0.1". Actual: ' + (String(-0.1)));
}

// CHECK#6
if (String(-0.000001) !== "-0.000001") {
  $ERROR('#6: String(-0.000001) === "-0.000001". Actual: ' + (String(-0.000001)));
}

// CHECK#7
if (String(-1e-6) !== "-0.000001") {
  $ERROR('#7: String(-1e-6) === "0.000001". Actual: ' + (String(-1e-6)));
}

// CHECK#8
if (String(-1E-6) !== "-0.000001") {
  $ERROR('#8: String(-1E-6) === "0.000001". Actual: ' + (String(-1E-6)));
}


