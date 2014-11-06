// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * EscapeSequence :: HexEscapeSequence :: x HexDigit HexDigit
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A6.1_T2.js
 * @description HexEscapeSequence ::  ENGLISH CAPITAL ALPHABET
 */

//CHECK#A-Z
var hex = ["\x41", "\x42", "\x43", "\x44", "\x45", "\x46", "\x47", "\x48", "\x49", "\x4A", "\x4B", "\x4C", "\x4D", "\x4E", "\x4F", "\x50", "\x51", "\x52", "\x53", "\x54", "\x55", "\x56", "\x57", "\x58", "\x59", "\x5A"];
var character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
for (var index = 0; index <= 25; index++) {
  if (hex[index] !== character[index]) {
    $ERROR('#' + character[index] + ' ');
  }
}

