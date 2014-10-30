// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * SPACE (U+0020) may occur within strings
 *
 * @path ch07/7.2/S7.2_A2.4_T2.js
 * @description Use real SPACE
 */

//CHECK#1
if (" str ing " !== "\u0020str\u0020ing\u0020") {
  $ERROR('#1: " str ing " === "\\u0020str\\u0020ing\\u0020"');
}

