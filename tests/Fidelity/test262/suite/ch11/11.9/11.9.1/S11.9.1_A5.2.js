// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is Number and Type(y) is String,
 * return the result of comparison x == ToNumber(y)
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A5.2.js
 * @description x is primitive number, y is primitive string
 */

//CHECK#1
if ((1 == "1") !== true) {
  $ERROR('#1: (1 == "1") === true');
}

//CHECK#2
if ((1.100 == "+1.10") !== true) {
  $ERROR('#2: (1.100 == "+1.10") === true');
}

//CHECK#3
if ((1 == "true") !== false) {
  $ERROR('#3: (1 == "true") === false');
}

//CHECK#4
if ((255 == "0xff") !== true) {
  $ERROR('#4: (255 == "0xff") === true');
}

//CHECK#5
if ((0 == "") !== true) {
  $ERROR('#5: (0 == "") === true');
}

