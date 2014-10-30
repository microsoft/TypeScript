// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscape :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit HexDigit
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A4.1_T2.js
 * @description Tested string include ENGLISH CAPITAL ALPHABET and english small alphabet
 */

//CHECK#41-5A
hex = ["\\u0041", "\\u0042", "\\u0043", "\\u0044", "\\u0045", "\\u0046", "\\u0047", "\\u0048", "\\u0049", "\\u004A", "\\u004B", "\\u004C", "\\u004D", "\\u004E", "\\u004F", "\\u0050", "\\u0051", "\\u0052", "\\u0053", "\\u0054", "\\u0055", "\\u0056", "\\u0057", "\\u0058", "\\u0059", "\\u005A"];
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
hex = ["\\u0061", "\\u0062", "\\u0063", "\\u0064", "\\u0065", "\\u0066", "\\u0067", "\\u0068", "\\u0069", "\\u006A", "\\u006B", "\\u006C", "\\u006D", "\\u006E", "\\u006F", "\\u0070", "\\u0071", "\\u0072", "\\u0073", "\\u0074", "\\u0075", "\\u0076", "\\u0077", "\\u0078", "\\u0079", "\\u007A"];
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

