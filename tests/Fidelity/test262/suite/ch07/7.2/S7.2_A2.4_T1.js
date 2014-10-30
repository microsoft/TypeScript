// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * SPACE (U+0020) may occur within strings
 *
 * @path ch07/7.2/S7.2_A2.4_T1.js
 * @description Use SPACE(\u0020)
 */

// CHECK#1
if (eval("'\u0020str\u0020ing\u0020'") !== "\u0020str\u0020ing\u0020") {
  $ERROR('#1: eval("\'\\u0020str\\u0020ing\\u0020\'") === "\\u0020str\\u0020ing\\u0020"');
}

//CHECK#2
if (eval("' str ing '") !== " str ing ") {
  $ERROR('#2: eval("\' str ing \'") === " str ing "');
}

