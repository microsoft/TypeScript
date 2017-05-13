// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * PARAGRAPH SEPARATOR (U+2029) within strings is not allowed
 *
 * @path ch07/7.3/S7.3_A2.4.js
 * @description Insert PARAGRAPH SEPARATOR (\u2029) into string
 * @negative
 */

// CHECK#1
if (eval("'\u2029str\u2029ing\u2029'") === "\u2029str\u2029ing\u2029") {
  $ERROR('#1: eval("\'\\u2029str\\u2029ing\\u2029\'") === "\\u2029str\\u2029ing\\u2029"');
}

