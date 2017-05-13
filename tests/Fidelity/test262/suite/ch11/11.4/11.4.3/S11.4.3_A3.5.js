// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of appying "typeof" operator to string is "string"
 *
 * @path ch11/11.4/11.4.3/S11.4.3_A3.5.js
 * @description typeof (string value) === "string"
 */

//CHECK#1
if (typeof "1" !== "string") {
  $ERROR('#1: typeof "1" === "string". Actual: ' + (typeof "1"));
}

//CHECK#2
if (typeof "NaN" !== "string") {
  $ERROR('#2: typeof "NaN" === "string". Actual: ' + (typeof "NaN"));
}

//CHECK#3
if (typeof "Infinity" !== "string") {
  $ERROR('#3: typeof "Infinity" === "string". Actual: ' + (typeof "Infinity"));
}

//CHECK#4
if (typeof "" !== "string") {
  $ERROR('#4: typeof "" === "string". Actual: ' + (typeof ""));
}

//CHECK#5
if (typeof "true" !== "string") {
  $ERROR('#5: typeof "true" === "string". Actual: ' + (typeof "true"));
}

//CHECK#6
if (typeof Date() !== "string") {
  $ERROR('#6: typeof Date() === "string". Actual: ' + (typeof Date()));
}

