// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Expression in "do-while" IterationStatement is bracketed with braces
 *
 * @path ch12/12.6/12.6.1/S12.6.1_A6_T1.js
 * @description Checking if execution of "do{} while 1" fails
 * @negative
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
do break; while 1;
//
//////////////////////////////////////////////////////////////////////////////

