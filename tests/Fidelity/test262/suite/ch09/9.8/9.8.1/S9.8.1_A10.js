// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Return the string consisting of the most significant
 * digit of the decimal representation of s, followed by a decimal point '.',
 * followed by the remaining k-1 digits of the decimal representation of s,
 * followed by the lowercase character 'e', followed by a plus sign '+' or
 * minus sign '-' according to whether n-1 is positive or negative, followed
 * by the decimal representation of the integer abs(n-1) (with no leading zeros)
 *
 * @path ch09/9.8/9.8.1/S9.8.1_A10.js
 * @description Various float numbers convert to String by explicit transformation
 */

// CHECK#1
if (String(1.2345) !== "1.2345") {
  $ERROR('#1: String(1.2345) === "1.2345". Actual: ' + (String(1.2345)));
}

// CHECK#2
if (String(1.234567890) !== "1.23456789") {
  $ERROR('#2: String(1.234567890) === "1.23456789". Actual: ' + (String(1.234567890)));
}

// CHECK#3
if (String(0.12345) !== "0.12345") {
  $ERROR('#3: String(0.12345) === "0.12345". Actual: ' + (String(0.12345)));
}

// CHECK#4
if (String(.012345) !== "0.012345") {
  $ERROR('#4: String(.012345) === "0.012345". Actual: ' + (String(.012345)));
}

// CHECK#5
if (String(.0012345) !== "0.0012345") {
  $ERROR('#5: String(.0012345) === "0.0012345". Actual: ' + (String(.0012345)));
}

// CHECK#6
if (String(.00012345) !== "0.00012345") {
  $ERROR('#6: String(.00012345) === "0.00012345". Actual: ' + (String(.00012345)));
}

// CHECK#7
if (String(.000012345) !== "0.000012345") {
  $ERROR('#7: String(.000012345) === "0.000012345". Actual: ' + (String(.000012345)));
}

// CHECK#8
if (String(.0000012345) !== "0.0000012345") {
  $ERROR('#8: String(.0000012345) === "0.0000012345". Actual: ' + (String(.0000012345)));
}

// CHECK#9
if (String(.00000012345) !== "1.2345e-7") {
  $ERROR('#9: String(.00000012345) === "1.2345e-7". Actual: ' + (String(.00000012345)));
}

