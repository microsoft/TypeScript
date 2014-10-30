// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is String and Type(y) is Number,
 * return the result of comparison ToNumber(x) == y
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A5.3.js
 * @description x is primitive string, y is primitive number
 */

//CHECK#1
if (("-1" == -1) !== true) {
  $ERROR('#1: ("-1" == -1) === true');
}

//CHECK#2
if (("-1.100" == -1.10) !== true) {
  $ERROR('#2: ("-1.100" == -1.10) === true');
}

//CHECK#3
if (("false" == 0) !== false) {
  $ERROR('#3: ("false" == 0) === false');
}

//CHECK#4
if (("5e-324" == 5e-324) !== true) {
  $ERROR('#4: ("5e-324" == 5e-324) === true');
}


