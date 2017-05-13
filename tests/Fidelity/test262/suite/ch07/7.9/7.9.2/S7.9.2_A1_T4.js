// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check examples for automatic semicolon insertion from the Standart
 *
 * @path ch07/7.9/7.9.2/S7.9.2_A1_T4.js
 * @description return \n a+b is a valid sentence in the ECMAScript grammar
 *  with automatic semicolon insertion, but returned undefined
 */

//CHECK#1
var a=1,b=2;
function test(){
	return
	a+b
}
var x=test();
if (x!==undefined) $ERROR('#1: Automatic semicolon insertion not work with return');

