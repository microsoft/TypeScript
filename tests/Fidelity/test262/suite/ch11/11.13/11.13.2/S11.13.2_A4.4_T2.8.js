// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production x += y is the same as x = x + y
 *
 * @path ch11/11.13/11.13.2/S11.13.2_A4.4_T2.8.js
 * @description Type(x) is different from Type(y) and both types vary between String (primitive or object) and Undefined
 */

//CHECK#1
x = "1";
x += undefined;
if (x !== "1undefined") {
  $ERROR('#1: x = "1"; x += undefined; x === "1undefined". Actual: ' + (x));
}

//CHECK#2
x = undefined;
x += "1";
if (x !== "undefined1") {
  $ERROR('#2: x = undefined; x += "1"; x === "undefined1". Actual: ' + (x));
}

//CHECK#3
x = new String("1");
x += undefined;
if (x !== "1undefined") {
  $ERROR('#3: x = new String("1"); x += undefined; x === "1undefined". Actual: ' + (x));
}

//CHECK#4
x = undefined;
x += new String("1");
if (x !== "undefined1") {
  $ERROR('#4: x = undefined; x += new String("1"); x === "undefined1". Actual: ' + (x));
}

