// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Multi line comment can contain CARRIAGE RETURN (U+000D)
 *
 * @path ch07/7.3/S7.3_A5.2_T2.js
 * @description Insert real CARRIAGE RETURN into multi line comment
 */

/*CHECK#1*/
var x = 0;
/*
multi
line
comment
x = 1;
*/
if (x !== 0) {
  $ERROR('#1: var x = 0; /*\\rmulti\\rline\\rcomment\\rx = 1;\\r*/ x === 0. Actual: ' + (x));
}

