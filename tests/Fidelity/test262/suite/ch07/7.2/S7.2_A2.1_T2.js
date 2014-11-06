// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * HORIZONTAL TAB (U+0009) may occur within strings
 *
 * @path ch07/7.2/S7.2_A2.1_T2.js
 * @description Use real HORIZONTAL TAB
 */

//CHECK#1
if ("	str	ing	" !== "\u0009str\u0009ing\u0009") {
  $ERROR('#1: "	str	ing	" === "\\u0009str\\u0009ing\\u0009"');
}

