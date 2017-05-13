// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CharacterEscapeSequnce :: NonEscapeSequence
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A4.2_T7.js
 * @description NonEscapeSequence :: RUSSIAN SMALL ALPHABET
 */

//CHECK#а-я
var CharacterCode = [0x0430, 0x0431, 0x0432, 0x0433, 0x0434, 0x0435, 0x0436, 0x0437, 0x0438, 0x0439, 0x043A, 0x043B, 0x043C, 0x043D, 0x043E, 0x043F, 0x0440, 0x0441, 0x0442, 0x0443, 0x0444, 0x0445, 0x0446, 0x0447, 0x0448, 0x0449, 0x044A, 0x044B, 0x044C, 0x044D, 0x044E, 0x044F, 0x0451];
var NonEscapeCharacter = ["\а", "\б", "\в", "\г", "\д", "\е", "\ж", "\з", "\и", "\й", "\к", "\л", "\м", "\н", "\о", "\п", "\р", "\с", "\т", "\у", "\ф", "\х", "\ц", "\ч", "\ш", "\щ", "\ъ", "\ы", "\ь", "\э", "\ю", "\я", "\ё"];
for (var index = 0; index <= 32; index++) {
  if (String.fromCharCode(CharacterCode[index]) !== NonEscapeCharacter[index]) {
    $ERROR('#' + NonEscapeCharacter[index] + ' ');
  }
}

