// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * If the parse fails, throw a SyntaxError exception (but see also clause 16)
 *
 * @path ch15/15.1/15.1.2/15.1.2.1/S15.1.2.1_A2_T2.js
 * @description Checking if execution of "eval("x = 1; x\u000A++")" fails
 * @negative
 */

//CHECK#1
var x;
eval("x = 1; x\u000A++"); 

