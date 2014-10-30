// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegularExpressionFirstChar :: BackslashSequence :: \NonTerminator,
 * RegularExpressionChars :: [empty], RegularExpressionFlags :: [empty]
 *
 * @path ch07/7.8/7.8.5/S7.8.5_A1.4_T1.js
 * @description Check similar to (/\1/.source === "\\1")
 */

//CHECK#1
if (/\1/.source !== "\\1") {
  $ERROR('#1: /\\1/');
}   

//CHECK#2
if (/\a/.source !== "\\a") {
  $ERROR('#2: /\\a/');
}

//CHECK#3
if (/\;/.source !== "\\;") {
  $ERROR('#3: /\\;/');
}

//CHECK#4
if (/\ /.source !== "\\ ") {
  $ERROR('#4: /\\ /');
}  

