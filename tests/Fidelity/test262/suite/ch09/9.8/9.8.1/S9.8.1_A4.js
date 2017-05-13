// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If m is infinity, return the string "Infinity"
 *
 * @path ch09/9.8/9.8.1/S9.8.1_A4.js
 * @description +/-Infinity convert to String by explicit transformation
 */

// CHECK#1
if (String(Infinity) !== "Infinity") {
  $ERROR('#1: String(Infinity) === "Infinity". Actual: ' + (String(Infinity)));
}

// CHECK#2
if (String(Number.POSITIVE_INFINITY) !== "Infinity") {
  $ERROR('#2: String(Number.POSITIVE_INFINITY) === "Infinity". Actual: ' + (String(Number.POSITIVE_INFINITY)));
}

// CHECK#3
if (String(-Infinity) !== "-Infinity") {
  $ERROR('#3: String(-Infinity) === "-Infinity". Actual: ' + (String(-Infinity)));
}

// CHECK#4
if (String(Number.NEGATIVE_INFINITY) !== "-Infinity") {
  $ERROR('#4: String(Number.NEGATIVE_INFINITY) === "-Infinity". Actual: ' + (String(Number.NEGATIVE_INFINITY)));
}

