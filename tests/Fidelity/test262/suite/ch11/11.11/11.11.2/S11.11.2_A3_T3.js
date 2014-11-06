// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If ToBoolean(x) is false, return y
 *
 * @path ch11/11.11/11.11.2/S11.11.2_A3_T3.js
 * @description Type(x) and Type(y) vary between primitive string and String object
 */

//CHECK#1
if (("" || "1") !== "1") {
  $ERROR('#1: ("" || "1") === "1"');
}

//CHECK#2
var y = new String("1");
if (("" || y) !== y) {
  $ERROR('#2: (var y = new String("1"); "" || y) === y');
}

