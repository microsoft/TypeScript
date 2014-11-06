// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of ToString conversion from null value is "null"
 *
 * @path ch09/9.8/S9.8_A2_T2.js
 * @description null convert to String by implicit transformation
 */

// CHECK#1
if (null + "" !== "null") {
  $ERROR('#1: null + "" === "null". Actual: ' + (null + "")); 
} 

