// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * CARRIAGE RETURN (U+000D) may occur between any two tokens
 *
 * @path ch07/7.3/S7.3_A1.2_T2.js
 * @description Insert real CARRIAGE RETURN between tokens of var x=1
 */

//CHECK#1
var
x
=
1;
if (x !== 1) {
  $ERROR('#1: var\\nx\\n=\\n1\\n; x === 1. Actual: ' + (x));
}

