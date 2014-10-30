// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscape :: HexEscapeSequence :: x HexDigit HexDigit
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A3.1_T2.js
 * @description Checking ENGLISH CAPITAL ALPHABET and english small alphabet
 */

//CHECK#41-5A
hex = ["\\x41", "\\x42", "\\x43", "\\x44", "\\x45", "\\x46", "\\x47", "\\x48", "\\x49", "\\x4A", "\\x4B", "\\x4C", "\\x4D", "\\x4E", "\\x4F", "\\x50", "\\x51", "\\x52", "\\x53", "\\x54", "\\x55", "\\x56", "\\x57", "\\x58", "\\x59", "\\x5A"];
character = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var result = true;
for (index = 0; index < hex.length; index++) {
  arr = (new RegExp(hex[index])).exec(character[index]); 
  if ((arr === null) || (arr[0] !== character[index])) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: ENGLISH CAPITAL ALPHABET');
}  

//CHECK#61-7A
hex = ["\\x61", "\\x62", "\\x63", "\\x64", "\\x65", "\\x66", "\\x67", "\\x68", "\\x69", "\\x6A", "\\x6B", "\\x6C", "\\x6D", "\\x6E", "\\x6F", "\\x70", "\\x71", "\\x72", "\\x73", "\\x74", "\\x75", "\\x76", "\\x77", "\\x78", "\\x79", "\\x7A"];
character = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var result = true;
for (index = 0; index < hex.length; index++) {
  arr = (new RegExp(hex[index])).exec(character[index]); 
  if ((arr === null) || (arr[0] !== character[index])) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: english small alphabet');
} 

