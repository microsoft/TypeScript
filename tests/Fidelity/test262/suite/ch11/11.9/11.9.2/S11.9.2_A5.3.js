// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is String and Type(y) is Number,
 * return the result of comparison ToNumber(x) != y
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A5.3.js
 * @description x is primitive string, y is primitive number
 */

//CHECK#1
if (("-1" != -1) !== false) {
  $ERROR('#1: ("-1" != -1) === false');
}

//CHECK#2
if (("-1.100" != -1.10) !== false) {
  $ERROR('#2: ("-1.100" != -1.10) === false');
}

//CHECK#3
if (("false" != 0) !== true) {
  $ERROR('#3: ("false" != 0) === true');
}

//CHECK#4
if (("5e-324" != 5e-324) !== false) {
  $ERROR('#4: ("5e-324" != 5e-324) === false');
}


