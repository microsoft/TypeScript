// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Result of ToString conversion from undefined value is "undefined"
 *
 * @path ch09/9.8/S9.8_A1_T2.js
 * @description Undefined values is undefined, void 0 and eval("var x"). Use implicit transformation
 */

// CHECK#1
if (undefined + "" !== "undefined") {
  $ERROR('#1: undefined + "" === "undefined". Actual: ' + (undefined + ""));
}

// CHECK#2
if (void 0 + "" !== "undefined") {
  $ERROR('#2: void 0 + "" === "undefined". Actual: ' + (void 0 + ""));
}

// CHECK#3
if (eval("var x") + "" !== "undefined") {
  $ERROR('#3: eval("var x") + "" === "undefined". Actual: ' + (eval("var x") + ""));
}

