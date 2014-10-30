// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Single line comment can contain SPACE (U+0020)
 *
 * @path ch07/7.2/S7.2_A3.4_T2.js
 * @description Use real SPACE
 */

//CHECK#1
var x = 0;
// single line comment x = 1;
if (x !== 0) {
  $ERROR('#1: var x = 0; // single line comment x = 1; x === 0. Actual: ' + (x));
}

