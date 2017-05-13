// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Check examples for automatic semicolon insertion from the Standart
 *
 * @path ch07/7.9/7.9.2/S7.9.2_A1_T5.js
 * @description a=b \n ++c is a valid sentence in the ECMAScript grammar
 *  with automatic semicolon insertion, but a!==b++c
 */

//CHECK#1
var a=1,b=2,c=3;
a=b
++c

if (a!==b) $ERROR('#1: Automatic semicolon insertion not work with ++');

