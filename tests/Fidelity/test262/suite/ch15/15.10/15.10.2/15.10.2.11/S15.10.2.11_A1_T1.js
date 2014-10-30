// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * DecimalEscape :: DecimalIntegerLiteral [lookahead not in DecimalDigit]
 *
 * @path ch15/15.10/15.10.2/15.10.2.11/S15.10.2.11_A1_T1.js
 * @description DecimalEscape :: 0. If i is zero, return the EscapeValue consisting of a <NUL> character (Unicodevalue0000)
 */

//CHECK#1
var arr = /\0/.exec("\u0000"); 
if ((arr === null) || (arr[0] !== "\u0000")) {
  $ERROR('#1: var arr = /\\0/.exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]));
}

//CHECK#2
var arr = (new RegExp("\\0")).exec("\u0000"); 
if ((arr === null) || (arr[0] !== "\u0000")) {
  $ERROR('#2: var arr = (new RegExp("\\0")).exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]));
}

