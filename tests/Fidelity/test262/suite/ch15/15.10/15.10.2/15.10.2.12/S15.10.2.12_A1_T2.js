// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production CharacterClassEscape :: s evaluates by returning the set of characters
 * containing the characters that are on the right-hand side of the WhiteSpace (7.2) or LineTerminator (7.3) productions
 *
 * @path ch15/15.10/15.10.2/15.10.2.12/S15.10.2.12_A1_T2.js
 * @description LineTerminator
 */

//CHECK#1
var arr = /\s/.exec("\u000A");
if ((arr === null) || (arr[0] !== "\u000A")) {
  $ERROR('#1: var arr = /\\s/.exec("\\u000A"); arr[0] === "\\u000A". Actual. ' + (arr && arr[0]));
}

//CHECK#2
var arr = /\s/.exec("\u000D");
if ((arr === null) || (arr[0] !== "\u000D")) {
  $ERROR('#2: var arr = /\\s/.exec("\\u000D"); arr[0] === "\\u000D". Actual. ' + (arr && arr[0]));
}  

//CHECK#3
var arr = /\s/.exec("\u2028");
if ((arr === null) || (arr[0] !== "\u2028")) {
  $ERROR('#3: var arr = /\\s/.exec("\\u2028"); arr[0] === "\\u2028". Actual. ' + (arr && arr[0]));
}    

//CHECK#4
var arr = /\s/.exec("\u2029");
if ((arr === null) || (arr[0] !== "\u2029")) {
  $ERROR('#4: var arr = /\\s/.exec("\\u2029"); arr[0] === "\\u2029". Actual. ' + (arr && arr[0]));
}  

