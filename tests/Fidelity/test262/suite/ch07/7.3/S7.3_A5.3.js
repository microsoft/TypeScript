// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Multi line comment can contain LINE SEPARATOR (U+2028)
 *
 * @path ch07/7.3/S7.3_A5.3.js
 * @description Insert LINE SEPARATOR (U+2028) into multi line comment
 */

// CHECK#1
eval("/*\u2028 multi line \u2028 comment \u2028*/");

//CHECK#2
var x = 0;
eval("/*\u2028 multi line \u2028 comment \u2028 x = 1;*/");
if (x !== 0) {
  $ERROR('#1: var x = 0; eval("/*\\u2028 multi line \\u2028 comment \\u2028 x = 1;*/"); x === 0. Actual: ' + (x));
}

