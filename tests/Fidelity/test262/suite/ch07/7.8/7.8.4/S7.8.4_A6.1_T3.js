// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * EscapeSequence :: HexEscapeSequence :: x HexDigit HexDigit
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A6.1_T3.js
 * @description HexEscapeSequence ::  ENGLISH SMALL ALPHABET
 */

//CHECK#a-z
var hex = ["\x61", "\x62", "\x63", "\x64", "\x65", "\x66", "\x67", "\x68", "\x69", "\x6A", "\x6B", "\x6C", "\x6D", "\x6E", "\x6F", "\x70", "\x71", "\x72", "\x73", "\x74", "\x75", "\x76", "\x77", "\x78", "\x79", "\x7A"];
var character = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
for (var index = 0; index <= 25; index++) {
  if (hex[index] !== character[index]) {
    $ERROR('#' + character[index] + ' ');
  }
}

