// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscapeSequnce :: NonEscapeSequence
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A4.2_T5.js
 * @description NonEscapeSequence :: RUSSIAN CAPITAL ALPHABET
 */

//CHECK#А-Я
var CharacterCode = [0x0410, 0x0411, 0x0412, 0x0413, 0x0414, 0x0415, 0x0416, 0x0417, 0x0418, 0x0419, 0x041A, 0x041B, 0x041C, 0x041D, 0x041E, 0x041F, 0x0420, 0x0421, 0x0422, 0x0423, 0x0424, 0x0425, 0x0426, 0x0427, 0x0428, 0x0429, 0x042A, 0x042B, 0x042C, 0x042D, 0x042E, 0x042F, 0x0401];
var NonEscapeCharacter = ["\А", "\Б", "\В", "\Г", "\Д", "\Е", "\Ж", "\З", "\И", "\Й", "\К", "\Л", "\М", "\Н", "\О", "\П", "\Р", "\С", "\Т", "\У", "\Ф", "\Х", "\Ц", "\Ч", "\Ш", "\Щ", "\Ъ", "\Ы", "\Ь", "\Э", "\Ю", "\Я", "\Ё"];
for (var index = 0; index <= 32; index++) {
  if (String.fromCharCode(CharacterCode[index]) !== NonEscapeCharacter[index]) {
    $ERROR('#' + NonEscapeCharacter[index] + ' ');
  }
}

