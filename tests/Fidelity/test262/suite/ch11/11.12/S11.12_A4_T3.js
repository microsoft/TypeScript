// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is true, return y
 *
 * @path ch11/11.12/S11.12_A4_T3.js
 * @description Type(y) and Type(z) are string primitives
 */

//CHECK#1
if (("1" ? "" : "1") !== "") {
  $ERROR('#1: ("1" ? "" : "1") === ""');
}

//CHECK#2
var y = new String("1");
if (("1" ? y : "") !== y) {
  $ERROR('#2: (var y = new String("1"); ("1" ? y : "") === y');
}

//CHECK#3
var y = new String("y");
if ((y ? y : "1") !== y) {
  $ERROR('#3: (var y = new String("y"); (y ? y : "1") === y');
}

