// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * EscapeSequence :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit HexDigit
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A7.1_T2.js
 * @description UnicodeEscapeSequence ::  ENGLISH CAPITAL ALPHABET
 */

//CHECK#A-Z
var unicode = ["\u0041", "\u0042", "\u0043", "\u0044", "\u0045", "\u0046", "\u0047", "\u0048", "\u0049", "\u004A", "\u004B", "\u004C", "\u004D", "\u004E", "\u004F", "\u0050", "\u0051", "\u0052", "\u0053", "\u0054", "\u0055", "\u0056", "\u0057", "\u0058", "\u0059", "\u005A"];
var character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
for (var index = 0; index <= 25; index++) {
  if (unicode[index] !== character[index]) {
    $ERROR('#' + character[index] + ' ');
  }
}

