// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator remove leading StrWhiteSpaceChar
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A2_T6.js
 * @description StrWhiteSpaceChar :: CR (U+000D)
 */

//CHECK#1
if (parseFloat("\u000D1.1") !== parseFloat("1.1")) {
  $ERROR('#1: parseFloat("\\u000D1.1") === parseFloat("1.1"). Actual: ' + (parseFloat("\u000D1.1")));
}

//CHECK#2
if (parseFloat("\u000D\u000D-1.1") !== parseFloat("-1.1")) {
  $ERROR('#2: parseFloat("\\u000D\\u000D-1.1") === parseFloat("-1.1"). Actual: ' + (parseFloat("\u000D\u000D-1.1")));
}

//CHECK#3
if (isNaN(parseFloat("\u000D")) !== true) {
  $ERROR('#3: parseFloat("\\u000D") === Not-a-Number. Actual: ' + (parseFloat("\u000D")));
}

