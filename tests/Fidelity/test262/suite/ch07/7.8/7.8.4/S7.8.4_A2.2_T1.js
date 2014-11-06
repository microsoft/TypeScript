// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Correct interpretation of RUSSIAN ALPHABET
 *
 * @path ch07/7.8/7.8.4/S7.8.4_A2.2_T1.js
 * @description Check RUSSIAN CAPITAL ALPHABET
 */

//CHECK#А-Я
var unicode = ["\u0410", "\u0411", "\u0412", "\u0413", "\u0414", "\u0415", "\u0416", "\u0417", "\u0418", "\u0419", "\u041A", "\u041B", "\u041C", "\u041D", "\u041E", "\u041F", "\u0420", "\u0421", "\u0422", "\u0423", "\u0424", "\u0425", "\u0426", "\u0427", "\u0428", "\u0429", "\u042A", "\u042B", "\u042C", "\u042D", "\u042E", "\u042F", "\u0401"];
var character = ["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "Й", "К", "Л", "М", "Н", "О", "П", "Р", "С", "Т", "У", "Ф", "Х", "Ц", "Ч", "Ш", "Щ", "Ъ", "Ы", "Ь", "Э", "Ю", "Я", "Ё"];
for (var index = 0; index <= 32; index++) {
  if (unicode[index] !== character[index]) {
    $ERROR('#' + character[index] + ' ');
  }
}

