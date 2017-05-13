// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Return the string consisting of the single digit of s,
 * followed by lowercase character 'e', followed by a plus sign '+' or minus
 * sign '-' according to whether n-1 is positive or negative, followed by the
 * decimal representation of the integer abs(n-1) (with no leading zeros)
 *
 * @path ch09/9.8/9.8.1/S9.8.1_A9_T2.js
 * @description Various float numbers with many zeros convert to String by explicit transformation
 */

// CHECK#1
if (String(0.0000001) !== "1e-7") {
  $ERROR('#1: String(0.0000001) === "1e-7". Actual: ' + (String(0.0000001)));
}

// CHECK#2
if (String(0.000000000100000000000) !== "1e-10") {
  $ERROR('#2: String(0.000000000100000000000) === "1e-10". Actual: ' + (String(0.000000000100000000000)));
}

// CHECK#3
if (String(1e-7) !== "1e-7") {
  $ERROR('#3: String(1e-7) === "1e-7". Actual: ' + (String(1e-7)));
}

// CHECK#4
if (String(1.0e-10) !== "1e-10") {
  $ERROR('#4: String(1.0e-10) === "1e-10". Actual: ' + (String(1.0e-10)));
}

// CHECK#5
if (String(1E-7) !== "1e-7") {
  $ERROR('#5: String(1E-7) === "1e-7". Actual: ' + (String(1E-7)));
}

// CHECK#6
if (String(1.0E-10) !== "1e-10") {
  $ERROR('#6: String(1.0E-10) === "1e-10". Actual: ' + (String(1.0E-10)));
}

// CHECK#7
if (String(-0.0000001) !== "-1e-7") {
  $ERROR('#7: String(-0.0000001) === "1e-7". Actual: ' + (String(-0.0000001)));
}

// CHECK#8
if (String(-0.000000000100000000000) !== "-1e-10") {
  $ERROR('#8: String(-0.000000000100000000000) === "1e-10". Actual: ' + (String(-0.000000000100000000000)));
}

// CHECK#9
if (String(-1e-7) !== "-1e-7") {
  $ERROR('#9: String(-1e-7) === "-1e-7". Actual: ' + (String(-1e-7)));
}

// CHECK#10
if (String(-1.0e-10) !== "-1e-10") {
  $ERROR('#10: String(-1.0e-10) === "-1e-10". Actual: ' + (String(-1.0e-10)));
}

// CHECK#11
if (String(-1E-7) !== "-1e-7") {
  $ERROR('#11: String(-1E-7) === "-1e-7". Actual: ' + (String(-1E-7)));
}

// CHECK#12
if (String(-1.0E-10) !== "-1e-10") {
  $ERROR('#12: String(-1.0E-10) === "-1e-10". Actual: ' + (String(-1.0E-10)));
}

