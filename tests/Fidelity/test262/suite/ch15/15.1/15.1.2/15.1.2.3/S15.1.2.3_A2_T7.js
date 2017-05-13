// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator remove leading StrWhiteSpaceChar
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A2_T7.js
 * @description StrWhiteSpaceChar :: LF (U+000A)
 */

//CHECK#1
if (parseFloat("\u000A1.1") !== parseFloat("1.1")) {
  $ERROR('#1: parseFloat("\\u000A1.1") === parseFloat("1.1"). Actual: ' + (parseFloat("\u000A1.1")));
}

//CHECK#2
if (parseFloat("\u000A\u000A-1.1") !== parseFloat("-1.1")) {
  $ERROR('#2: parseFloat("\\u000A\\u000A-1.1") === parseFloat("-1.1"). Actual: ' + (parseFloat("\u000A\u000A-1.1")));
}

//CHECK#3
if (isNaN(parseFloat("\u000A")) !== true) {
  $ERROR('#3: parseFloat("\\u000A") === Not-a-Number. Actual: ' + (parseFloat("\u000A")));
}

