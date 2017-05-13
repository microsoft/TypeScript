// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Operator remove leading StrWhiteSpaceChar
 *
 * @path ch15/15.1/15.1.2/15.1.2.2/S15.1.2.2_A2_T5.js
 * @description StrWhiteSpaceChar :: VT (U+000B)
 */

//CHECK#1
if (parseInt("\u000B1") !== parseInt("1")) {
  $ERROR('#1: parseInt("\\u000B1") === parseInt("1"). Actual: ' + (parseInt("\u000B1")));
}

//CHECK#2
if (parseInt("\u000B\u000B-1") !== parseInt("-1")) {
  $ERROR('#2: parseInt("\\u000B\\u000B-1") === parseInt("-1"). Actual: ' + (parseInt("\u000B\u000B-1")));
}

//CHECK#3
if (isNaN(parseInt("\u000B")) !== true) {
  $ERROR('#3: parseInt("\\u000B") === Not-a-Number. Actual: ' + (parseInt("\u000B")));
}

