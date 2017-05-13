// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscape :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit HexDigit
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A4.1_T1.js
 * @description RegExp and tested string include uncode symbols
 */

//CHECK#0
var arr = /\u0000/.exec("\u0000"); 
if ((arr === null) || (arr[0] !== "\u0000")) {
  $ERROR('#0: var arr = /\\u0000/.exec(\\u0000); arr[0] === "\\u0000". Actual. ' + (arr && arr[0]));
}

//CHECK#1
var arr = /\u0001/.exec("\u0001"); 
if ((arr === null) || (arr[0] !== "\u0001")) {
  $ERROR('#1: var arr = /\\u0001/.exec(\\u0001); arr[0] === "\\u0001". Actual. ' + (arr && arr[0]));
}

//CHECK#2
var arr = /\u000A/.exec("\u000A"); 
if ((arr === null) || (arr[0] !== "\u000A")) {
  $ERROR('#2: var arr = /\\u000A/.exec(\\u000A); arr[0] === "\\u000A". Actual. ' + (arr && arr[0]));
}

//CHECK#3
var arr = /\u00FF/.exec("\u00FF"); 
if ((arr === null) || (arr[0] !== "\u00FF")) {
  $ERROR('#3: var arr = /\\u00FF/.exec(\\u00FF); arr[0] === "\\u00FF". Actual. ' + (arr && arr[0]));
}

//CHECK#4
var arr = /\u0FFF/.exec("\u0FFF"); 
if ((arr === null) || (arr[0] !== "\u0FFF")) {
  $ERROR('#4: var arr = /\\u0FFF/.exec(\\u0FFF); arr[0] === "\\u0FFF". Actual. ' + (arr && arr[0]));
}

//CHECK#5
var arr = /\uFFFF/.exec("\uFFFF"); 
if ((arr === null) || (arr[0] !== "\uFFFF")) {
  $ERROR('#5: var arr = /\\uFFFF/.exec(\\uFFFF); arr[0] === "\\uFFFF". Actual. ' + (arr && arr[0]));
}

