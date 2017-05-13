// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * FORM FEED (U+000C) may occur within strings
 *
 * @path ch07/7.2/S7.2_A2.3_T2.js
 * @description Use real FORM FEED
 */

//CHECK#1
if ("string" !== "\u000Cstr\u000Cing\u000C") {
  $ERROR('#1: "string" === "\\u000Cstr\\u000Cing\\u000C"');
}

