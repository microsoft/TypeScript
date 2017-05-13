// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If 1 <= s < 1e21 or -1e21 s < -1, return the string
 * consisting of the k digits of the decimal representation of s (in order,
 * with no leading zeroes), followed by n-k occurrences of the character '0'
 *
 * @path ch09/9.8/9.8.1/S9.8.1_A6.js
 * @description Various integer numbers convert to String by explicit transformation
 */

// CHECK#1
if (String(1) !== "1") {
  $ERROR('#1: String(1) === "1". Actual: ' + (String(1)));
}

// CHECK#2
if (String(10) !== "10") {
  $ERROR('#2: String(10) === "10". Actual: ' + (String(10)));
}

// CHECK#3
if (String(100) !== "100") {
  $ERROR('#3: String(100) === "100". Actual: ' + (String(100)));
}

// CHECK#4
if (String(100000000000000000000) !== "100000000000000000000") {
  $ERROR('#4: String(100000000000000000000) === "100000000000000000000". Actual: ' + (String(100000000000000000000)));
}

// CHECK#5
if (String(1e20) !== "100000000000000000000") {
  $ERROR('#5: String(1e20) === "100000000000000000000". Actual: ' + (String(1e20)));
}

// CHECK#6
if (String(12345) !== "12345") {
  $ERROR('#6: String(12345) === "12345". Actual: ' + (String(12345)));
}

// CHECK#7
if (String(12345000) !== "12345000") {
  $ERROR('#7: String(12345000) === "12345000". Actual: ' + (String(12345000)));
}

// CHECK#8
if (String(-1) !== "-1") {
  $ERROR('#8: String(-1) === "-1". Actual: ' + (String(-1)));
}

// CHECK#9
if (String(-10) !== "-10") {
  $ERROR('#9: String(-10) === "-10". Actual: ' + (String(-10)));
}

// CHECK#10
if (String(-100) !== "-100") {
  $ERROR('#3: String(-100) === "-100". Actual: ' + (String(-100)));
}

// CHECK#10
if (String(-100000000000000000000) !== "-100000000000000000000") {
  $ERROR('#10: String(-100000000000000000000) === "-100000000000000000000". Actual: ' + (String(-100000000000000000000)));
}

// CHECK#11
if (String(-1e20) !== "-100000000000000000000") {
  $ERROR('#11: String(-1e20) === "-100000000000000000000". Actual: ' + (String(-1e20)));
}

// CHECK#12
if (String(-12345) !== "-12345") {
  $ERROR('#12: String(-12345) === "-12345". Actual: ' + (String(-12345)));
}

// CHECK#13
if (String(-12345000) !== "-12345000") {
  $ERROR('#13: String(-12345000) === "-12345000". Actual: ' + (String(-12345000)));
}

// CHECK#14
if (String(1E20) !== "100000000000000000000") {
  $ERROR('#14: String(1E20) === "100000000000000000000". Actual: ' + (String(1E20)));
}

// CHECK#15
if (String(-1E20) !== "-100000000000000000000") {
  $ERROR('#15: String(-1E20) === "-100000000000000000000". Actual: ' + (String(-1E20)));
}


