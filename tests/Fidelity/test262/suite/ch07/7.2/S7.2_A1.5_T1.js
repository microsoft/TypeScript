// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * NO-BREAK SPACE (U+00A0) between any two tokens is allowed
 *
 * @path ch07/7.2/S7.2_A1.5_T1.js
 * @description Insert NO-BREAK SPACE(\u00A0) between tokens of var x=1
 */

// CHECK#1
eval("\u00A0var\u00A0x\u00A0=\u00A01\u00A0");
if (x !== 1) {
  $ERROR('#1: eval("\\u00A0var\\u00A0x\\u00A0=\\u00A01\\u00A0"); x === 1. Actual: ' + (x));
}

//CHECK#2
eval("\u00A0" + "var" + "\u00A0" + "x" + "\u00A0" + "=" + "\u00A0" + "1" + "\u00A0");
if (x !== 1) {
  $ERROR('#2: eval("\\u00A0" + "var" + "\\u00A0" + "x" + "\\u00A0" + "=" + "\\u00A0" + "1" + "\\u00A0"); x === 1. Actual: ' + (x));
}

