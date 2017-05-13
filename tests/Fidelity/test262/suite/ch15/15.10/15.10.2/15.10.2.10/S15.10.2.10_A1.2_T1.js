// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterEscape :: n evaluates by returning
 * the character \u000A
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A1.2_T1.js
 * @description Use \n in RegExp and \u000A in tested string
 */

//CHECK#1
var arr = /\n/.exec("\u000A");
if ((arr === null) || (arr[0] !== "\u000A")) {
  $ERROR('#1: var arr = /\\n/.exec("\\u000A"); arr[0] === "\\u000A". Actual. ' + (arr && arr[0]));
}

//CHECK#2
var arr = /\n\n/.exec("a\u000A\u000Ab");
if ((arr === null) || (arr[0] !== "\u000A\u000A")) {
  $ERROR('#2: var arr = /\\n\\n/.exec("a\\u000A\\u000Ab"); arr[0] === "\\u000A\\u000A". Actual. ' + (arr && arr[0]));
}    

