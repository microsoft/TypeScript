// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * LINE SEPARATOR (U+2028) within strings is not allowed
 *
 * @path ch07/7.3/S7.3_A2.3.js
 * @description Insert LINE SEPARATOR (\u2028) into string
 * @negative
 */

// CHECK#1
if (eval("'\u2028str\u2028ing\u2028'") === "\u2028str\u2028ing\u2028") {
  $ERROR('#1: eval("\'\\u2028str\\u2028ing\\u2028\'") === "\\u2028str\\u2028ing\\u2028"');
}

