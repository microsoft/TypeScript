// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegularExpressionChar :: BackslashSequence :: \NonTerminator,
 * RegularExpressionFlags :: [empty]
 *
 * @path ch07/7.8/7.8.5/S7.8.5_A2.4_T1.js
 * @description Check similar to (/a\1/.source === "a\\1")
 */

//CHECK#1
if (/a\1/.source !== "a\\1") {
  $ERROR('#1: /a\\1/');
}   

//CHECK#2
if (/a\a/.source !== "a\\a") {
  $ERROR('#2: /a\\a/');
}

//CHECK#3
if (/,\;/.source !== ",\\;") {
  $ERROR('#3: /,\\;/');
}

//CHECK#4
if (/ \ /.source !== " \\ ") {
  $ERROR('#4: / \\ /');
}  

