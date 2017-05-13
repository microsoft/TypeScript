// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Multi line comment can contain HORIZONTAL TAB (U+0009)
 *
 * @path ch07/7.2/S7.2_A4.1_T2.js
 * @description Use real HORIZONTAL TAB
 */

/*CHECK#1*/
var x = 0;
/*	multi	line	comment	x = 1;*/
if (x !== 0) {
  $ERROR('#1: var x = 0; /*	multi	line	comment	x = 1;*/ x === 0. Actual: ' + (x));
}

