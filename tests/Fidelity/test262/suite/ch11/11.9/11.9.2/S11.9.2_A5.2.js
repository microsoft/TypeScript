// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is Number and Type(y) is String,
 * return the result of comparison x != ToNumber(y)
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A5.2.js
 * @description x is primitive number, y is primitive string
 */

//CHECK#1
if ((1 != "1") !== false) {
  $ERROR('#1: (1 != "1") === false');
}

//CHECK#2
if ((1.100 != "+1.10") !== false) {
  $ERROR('#2: (1.100 != "+1.10") === false');
}

//CHECK#3
if ((1 != "true") !== true) {
  $ERROR('#3: (1 != "true") === true');
}

//CHECK#4
if ((255 != "0xff") !== false) {
  $ERROR('#4: (255 != "0xff") === false');
}

//CHECK#5
if ((0 != "") !== false) {
  $ERROR('#5: (0 != "") === false');
}

