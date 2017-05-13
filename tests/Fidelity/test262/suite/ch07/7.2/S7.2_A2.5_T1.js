// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * NO-BREAK SPACE (U+00A0) may occur within strings
 *
 * @path ch07/7.2/S7.2_A2.5_T1.js
 * @description Use NO-BREAK SPACE(\u00A0)
 */

// CHECK#1
if (eval("'\u00A0str\u00A0ing\u00A0'") !== "\u00A0str\u00A0ing\u00A0") {
  $ERROR('#1: eval("\'\\u00A0str\\u00A0ing\\u00A0\'") === "\\u00A0str\\u00A0ing\\u00A0"');
}

