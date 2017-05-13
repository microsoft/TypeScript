// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Single line comment can contain VERTICAL TAB (U+000B)
 *
 * @path ch07/7.2/S7.2_A3.2_T1.js
 * @description Use VERTICAL TAB(\u000B)
 */

// CHECK#1
eval("//\u000B single line \u000B comment \u000B");

//CHECK#2
var x = 0;
eval("//\u000B single line \u000B comment \u000B x = 1;");
if (x !== 0) {
  $ERROR('#1: var x = 0; eval("//\\u000B single line \\u000B comment \\u000B x = 1;"); x === 0. Actual: ' + (x));
}

