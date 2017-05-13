// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * LINE FEED (U+000A) within strings is not allowed
 *
 * @path ch07/7.3/S7.3_A2.1_T1.js
 * @description Insert LINE FEED (\u000A) into string
 * @negative
 */

// CHECK#1
if (eval("'\u000Astr\u000Aing\u000A'") === "\u000Astr\u000Aing\u000A") {
  $ERROR('#1: eval("\'\\u000Astr\\u000Aing\\u000A\'") === "\\u000Astr\\u000Aing\\u000A"');
}

