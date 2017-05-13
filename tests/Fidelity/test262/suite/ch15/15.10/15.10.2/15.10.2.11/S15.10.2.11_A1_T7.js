// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]
 *
 * @path ch15/15.10/15.10.2/15.10.2.11/S15.10.2.11_A1_T7.js
 * @description DecimalIntegerLiteral is not 0
 */

var arr = /\1(A)(B)\2/.exec("ABB");

//CHECK#1
if ((arr === null) || (arr[0] !== "ABB")) {
  $ERROR('#1: var arr = /\\1(A)(B)\\2/.exec("ABB"); arr[0] === "ABB". Actual. ' + (arr && arr[0]));
}

//CHECK#2
if ((arr === null) || (arr[1] !== "A")) {
  $ERROR('#2: var arr = /\\1(A)(B)\\2/.exec("ABB"); arr[1] === "A". Actual. ' + (arr && arr[1]));
}

//CHECK#3
if ((arr === null) || (arr[2] !== "B")) {
  $ERROR('#3: var arr = /\\1(A)(B)\\2/.exec("ABB"); arr[2] === "B". Actual. ' + (arr && arr[2]));
}      

