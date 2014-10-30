// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Multi line comment can contain CARRIAGE RETURN (U+000D)
 *
 * @path ch07/7.3/S7.3_A5.2_T1.js
 * @description Insert CARRIAGE RETURN (U+000D) into multi line comment
 */

// CHECK#1
eval("/*\u000D multi line \u000D comment \u000D*/");

//CHECK#2
var x = 0;
eval("/*\u000D multi line \u000D comment \u000D x = 1;*/");
if (x !== 0) {
  $ERROR('#1: var x = 0; eval("/*\\u000D multi line \\u000D comment \\u000D x = 1;*/"); x === 0. Actual: ' + (x));
}

