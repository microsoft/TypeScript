// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If Type(y) is Number and Type(y) is Boolean,
 * return the result of comparison x != ToNumber(y)
 *
 * @path ch11/11.9/11.9.2/S11.9.2_A3.3.js
 * @description x is primitive number, y is primitive boolean
 */

//CHECK#1
if ((0 != false) !== false) {
  $ERROR('#1: (0 != false) === false');
}

//CHECK#2
if (("1" != true) !== false) {
  $ERROR('#2: ("1" != true) === false');
}

//CHECK#3
if ((new Boolean(false) != false) !== false) {
  $ERROR('#3: (new Boolean(false) != false) === false');
}

//CHECK#4
if (({valueOf: function () {return "0"}} != false) !== false) {
  $ERROR('#4: ({valueOf: function () {return "0"}} != false) === false');
}

