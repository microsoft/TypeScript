// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator remove leading StrWhiteSpaceChar
 *
 * @path ch15/15.1/15.1.2/15.1.2.3/S15.1.2.3_A2_T2.js
 * @description StrWhiteSpaceChar :: SP (U+0020)
 */

//CHECK#1
if (parseFloat("\u00201.1") !== parseFloat("1.1")) {
  $ERROR('#1: parseFloat("\\u00201.1") === parseFloat("1.1"). Actual: ' + (parseFloat("\u00201.1")));
}

//CHECK#2
if (parseFloat("\u0020\u0020-1.1") !== parseFloat("-1.1")) {
  $ERROR('#2: parseFloat("\\u0020\\u0020-1.1") === parseFloat("-1.1"). Actual: ' + (parseFloat("\u0020\u0020-1.1")));
}

//CHECK#3
if (parseFloat(" 1.1") !== parseFloat("1.1")) {
  $ERROR('#3: parseFloat(" 1.1") === parseFloat("1.1"). Actual: ' + (parseFloat(" 1.1")));
}

//CHECK#4
if (parseFloat("       1.1") !== parseFloat("1.1")) {
  $ERROR('#4: parseFloat("       1.1") === parseFloat("1.1"). Actual: ' + (parseFloat("       1.1")));
}

//CHECK#5
if (parseFloat("       \u0020       \u0020-1.1") !== parseFloat("-1.1")) {
  $ERROR('#5: parseFloat("       \\u0020       \\u0020-1.1") === parseFloat("-1.1"). Actual: ' + (parseFloat("       \u0020       \u0020-1.1")));
}

//CHECK#6
if (isNaN(parseFloat("\u0020")) !== true) {
  $ERROR('#6: parseFloat("\\u0020") === Not-a-Number. Actual: ' + (parseFloat("\u0020")));
}

