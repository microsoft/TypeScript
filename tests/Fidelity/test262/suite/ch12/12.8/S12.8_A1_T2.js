// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Appearing of break without an IterationStatement leads to syntax error
 *
 * @path ch12/12.8/S12.8_A1_T2.js
 * @description Checking if break Identifier with no loop fails
 * @negative
 */

LABEL : x=3.14;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
var x=1;
break LABEL;
var y=2;
//
//////////////////////////////////////////////////////////////////////////////

