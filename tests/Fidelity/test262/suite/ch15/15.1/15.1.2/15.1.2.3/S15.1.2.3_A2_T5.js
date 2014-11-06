// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator remove leading StrWhiteSpaceChar
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A2_T5.js
 * @description StrWhiteSpaceChar :: VT (U+000B)
 */

//CHECK#1
if (parseFloat("\u000B1.1") !== parseFloat("1.1")) {
  $ERROR('#1: parseFloat("\\u000B1.1") === parseFloat("1.1"). Actual: ' + (parseFloat("\u000B1.1")));
}

//CHECK#2
if (parseFloat("\u000B\u000B-1.1") !== parseFloat("-1.1")) {
  $ERROR('#2: parseFloat("\\u000B\\u000B-1.1") === parseFloat("-1.1"). Actual: ' + (parseFloat("\u000B\u000B-1.1")));
}

//CHECK#3
if (isNaN(parseFloat("\u000B")) !== true) {
  $ERROR('#3: parseFloat("\\u000B") === Not-a-Number. Actual: ' + (parseFloat("\u000B")));
}

