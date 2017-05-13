// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * RegularExpressionChar :: NonTerminator but not \ or /,
 * RegularExpressionFlags :: [empty]
 *
 * @path ch07/7.8/7.8.5/S7.8.5_A2.1_T1.js
 * @description Without eval
 */

//CHECK#1
if (/1a/.source !== "1a") {
  $ERROR('#1: /1a/');
}   

//CHECK#2
if (/aa/.source !== "aa") {
  $ERROR('#2: /aa/');
}

//CHECK#3
if (/,;/.source !== ",;") {
  $ERROR('#3: /,;/');
}

//CHECK#4
if (/  /.source !== "  ") {
  $ERROR('#4: /  /');
}      

//CHECK#5
if (/a\u0041/.source !== "a\\u0041") {
  $ERROR('#5: /a\\u0041/');
}  

