// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CARRIAGE RETURN (U+000D) may occur between any two tokens
 *
 * @path ch07/7.3/S7.3_A1.2_T1.js
 * @description Insert CARRIAGE RETURN (\u000D and \r) between tokens of var x=1
 */

// CHECK#1
eval("\u000Dvar\u000Dx\u000D=\u000D1\u000D");
if (x !== 1) {
  $ERROR('#1: eval("\\u000Dvar\\u000Dx\\u000D=\\u000D1\\u000D"); x === 1. Actual: ' + (x));
}

//CHECK#2
eval("\u000D" + "var" + "\u000D" + "x" + "\u000D" + "=" + "\u000D" + "1" + "\u000D");
if (x !== 1) {
  $ERROR('#2: eval("\\u000D" + "var" + "\\u000D" + "x" + "\\u000D" + "=" + "\\u000D" + "1" + "\\u000D"); x === 1. Actual: ' + (x));
}

//CHECK#3
eval("\rvar\rx\r=\r1\r");
if (x !== 1) {
  $ERROR('#3: eval("\\rvar\\rx\\r=\\r1\\r"); x === 1. Actual: ' + (x));
}

//CHECK#4
eval("\r" + "var" + "\r" + "x" + "\r" + "=" + "\r" + "1" + "\r");
if (x !== 1) {
  $ERROR('#4: eval("\\r" + "var" + "\\r" + "x" + "\\r" + "=" + "\\r" + "1" + "\\r"); x === 1. Actual: ' + (x));
}

//CHECK#5
eval("\u000D" + "var" + "\r" + "x" + "\u000D" + "=" + "\r" + "1" + "\u000D");
if (x !== 1) {
  $ERROR('#5: eval("\\u000D" + "var" + "\\r" + "x" + "\\u000D" + "=" + "\\r" + "1" + "\\u000D"); x === 1. Actual: ' + (x));
}

