// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterEscape :: r evaluates by returning
 * the character \u000D
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A1.5_T1.js
 * @description Use \r in RegExp and \u000D in tested string
 */

//CHECK#1
var arr = /\r/.exec("\u000D");
if ((arr === null) || (arr[0] !== "\u000D")) {
  $ERROR('#1: var arr = /\\r/.exec("\\u000D"); arr[0] === "\\u000D". Actual. ' + (arr && arr[0]));
}

//CHECK#2
var arr = /\r\r/.exec("a\u000D\u000Db");
if ((arr === null) || (arr[0] !== "\u000D\u000D")) {
  $ERROR('#2: var arr = /\\r\\r/.exec("a\\u000D\\u000Db"); arr[0] === "\\u000D\\u000D". Actual. ' + (arr && arr[0]));
}    

