// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * HORIZONTAL TAB (U+0009) between any two tokens is allowed
 *
 * @path ch07/7.2/S7.2_A1.1_T2.js
 * @description Insert real HORIZONTAL TAB between tokens of var x=1
 */

//CHECK#1
	var  x	=	1	;
if (x !== 1) {
  $ERROR('#1: 	var	x	=	1	; x === 1. Actual: ' + (x));
}

//CHECK#2
eval("	var\tx	=\t2	");
if (x !== 2) {
  $ERROR('#2: 	var\\tx	=\\t1	; x === 2. Actual: ' + (x));
}

