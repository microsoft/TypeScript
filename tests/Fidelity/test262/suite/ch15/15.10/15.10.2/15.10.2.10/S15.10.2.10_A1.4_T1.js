// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterEscape :: f evaluates by returning
 * the character \u000C
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A1.4_T1.js
 * @description Use \f in RegExp and \u000C in tested string
 */

//CHECK#1
var arr = /\f/.exec("\u000C");
if ((arr === null) || (arr[0] !== "\u000C")) {
  $ERROR('#1: var arr = /\\f/.exec("\\u000C"); arr[0] === "\\u000C". Actual. ' + (arr && arr[0]));
}

//CHECK#2
var arr = /\f\f/.exec("a\u000C\u000Cb");
if ((arr === null) || (arr[0] !== "\u000C\u000C")) {
  $ERROR('#2: var arr = /\\f\\f/.exec("a\\u000C\\u000Cb"); arr[0] === "\\u000C\\u000C". Actual. ' + (arr && arr[0]));
}    

