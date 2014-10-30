// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscape :: UnicodeEscapeSequence :: u HexDigit HexDigit HexDigit HexDigit
 *
 * @path ch15/15.10/15.10.2/15.10.2.10/S15.10.2.10_A4.1_T3.js
 * @description Tested string include RUSSIAN CAPITAL ALPHABET and russian small alphabet in unicode notation
 */

//CHECK#0410-042F, 0401 
hex = ["\\u0410", "\\u0411", "\\u0412", "\\u0413", "\\u0414", "\\u0415", "\\u0416", "\\u0417", "\\u0418", "\\u0419", "\\u041A", "\\u041B", "\\u041C", "\\u041D", "\\u041E", "\\u041F", "\\u0420", "\\u0421", "\\u0422", "\\u0423", "\\u0424", "\\u0425", "\\u0426", "\\u0427", "\\u0428", "\\u0429", "\\u042A", "\\u042B", "\\u042C", "\\u042D", "\\u042E", "\\u042F", "\\u0401"];
character = ["\u0410", "\u0411", "\u0412", "\u0413", "\u0414", "\u0415", "\u0416", "\u0417", "\u0418", "\u0419", "\u041A", "\u041B", "\u041C", "\u041D", "\u041E", "\u041F", "\u0420", "\u0421", "\u0422", "\u0423", "\u0424", "\u0425", "\u0426", "\u0427", "\u0428", "\u0429", "\u042A", "\u042B", "\u042C", "\u042D", "\u042E", "\u042F", "\u0401"];
var result = true;
for (index = 0; index < hex.length; index++) {
  arr = (new RegExp(hex[index])).exec(character[index]); 
  if ((arr === null) || (arr[0] !== character[index])) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: RUSSIAN CAPITAL ALPHABET');
}  

//CHECK#0430-044F, 0451
hex = ["\\u0430", "\\u0431", "\\u0432", "\\u0433", "\\u0434", "\\u0435", "\\u0436", "\\u0437", "\\u0438", "\\u0439", "\\u043A", "\\u043B", "\\u043C", "\\u043D", "\\u043E", "\\u043F", "\\u0440", "\\u0441", "\\u0442", "\\u0443", "\\u0444", "\\u0445", "\\u0446", "\\u0447", "\\u0448", "\\u0449", "\\u044A", "\\u044B", "\\u044C", "\\u044D", "\\u044E", "\\u044F", "\\u0451"];
character = ["\u0430", "\u0431", "\u0432", "\u0433", "\u0434", "\u0435", "\u0436", "\u0437", "\u0438", "\u0439", "\u043A", "\u043B", "\u043C", "\u043D", "\u043E", "\u043F", "\u0440", "\u0441", "\u0442", "\u0443", "\u0444", "\u0445", "\u0446", "\u0447", "\u0448", "\u0449", "\u044A", "\u044B", "\u044C", "\u044D", "\u044E", "\u044F", "\u0451"];
var result = true;
for (index = 0; index < hex.length; index++) {
  arr = (new RegExp(hex[index])).exec(character[index]); 
  if ((arr === null) || (arr[0] !== character[index])) {
    result = false;
  }
}

if (result !== true) {
  $ERROR('#1: russian small alphabet');
}

