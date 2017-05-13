// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If y is a prefix of x, return false
 *
 * @path ch11/11.8/11.8.1/S11.8.1_A4.10.js
 * @description x and y are string primitives
 */

//CHECK#1
if (("x" < "x") !== false) {
  $ERROR('#1: ("x" < "x") === false');
}

//CHECK#2
if (("x" < "") !== false) {
  $ERROR('#2: ("x" < "") === false');
}

//CHECK#3
if (("abcd" < "ab") !== false) {
  $ERROR('#3: ("abcd" < ab") === false');
}

//CHECK#4
if (("abc\u0064" < "abcd") !== false) {
  $ERROR('#4: ("abc\\u0064" < abcd") === false');
}

//CHECK#5
if (("x" + "y" < "x") !== false) {
  $ERROR('#5: ("x" + "y" < "x") === false');
}

//CHECK#6
var x = "x";
if ((x + "y" < x) !== false) {
  $ERROR('#6: var x = "x"; (x + "y" < x) === false');
}


