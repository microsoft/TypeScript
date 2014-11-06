// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Correct interpretation of RUSSIAN ALPHABET
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A2.2_T2.js
 * @description Check RUSSIAN SMALL ALPHABET
 */

//CHECK#а-я
var unicode = ["\u0430", "\u0431", "\u0432", "\u0433", "\u0434", "\u0435", "\u0436", "\u0437", "\u0438", "\u0439", "\u043A", "\u043B", "\u043C", "\u043D", "\u043E", "\u043F", "\u0440", "\u0441", "\u0442", "\u0443", "\u0444", "\u0445", "\u0446", "\u0447", "\u0448", "\u0449", "\u044A", "\u044B", "\u044C", "\u044D", "\u044E", "\u044F", "\u0451"];
var character = ["а", "б", "в", "г", "д", "е", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я", "ё"];
for (var index = 0; index <= 32; index++) {
  if (unicode[index] !== character[index]) {
    $ERROR('#' + character[index] + ' ');
  }
}

