// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Multi line comment can contain HORIZONTAL TAB (U+0009)
 *
 * @path ch07/7.2/S7.2_A4.1_T1.js
 * @description Use HORIZONTAL TAB(\u0009)
 */

// CHECK#1
eval("/*\u0009 multi line \u0009 comment \u0009*/");

//CHECK#2
var x = 0;
eval("/*\u0009 multi line \u0009 comment \u0009 x = 1;*/");
if (x !== 0) {
  $ERROR('#1: var x = 0; eval("/*\\u0009 multi line \\u0009 comment \\u0009 x = 1;*/"); x === 0. Actual: ' + (x));
}

