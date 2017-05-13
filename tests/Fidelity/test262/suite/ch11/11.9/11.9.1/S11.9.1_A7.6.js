// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(x) is Object and Type(y) is String,
 * return ToPrimitive(x) == y
 *
 * @path ch11/11.9/11.9.1/S11.9.1_A7.6.js
 * @description x is object, y is primitive string
 */

//CHECK#1
if ((new Boolean(true) == "1") !== true) {
  $ERROR('#1: (new Boolean(true) == "1") === true');
}

//CHECK#2
if ((new Number(-1) == "-1") !== true) {
  $ERROR('#2: (new Number(-1) == "-1") === true');
}

//CHECK#3
if ((new String("x") == "x") !== true) {
  $ERROR('#3: (new String("x") == "x") === true');
}

