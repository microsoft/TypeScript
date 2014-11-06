// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator remove leading StrWhiteSpaceChar
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A2_T7.js
 * @description StrWhiteSpaceChar :: LF (U+000A)
 */

//CHECK#1
if (parseInt("\u000A1") !== parseInt("1")) {
  $ERROR('#1: parseInt("\\u000A1") === parseInt("1"). Actual: ' + (parseInt("\u000A1")));
}

//CHECK#2
if (parseInt("\u000A\u000A-1") !== parseInt("-1")) {
  $ERROR('#2: parseInt("\\u000A\\u000A-1") === parseInt("-1"). Actual: ' + (parseInt("\u000A\u000A-1")));
}

//CHECK#3
if (isNaN(parseInt("\u000A")) !== true) {
  $ERROR('#3: parseInt("\\u000A") === Not-a-Number. Actual: ' + (parseInt("\u000A")));
}

