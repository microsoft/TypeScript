// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The production Block can't be inside of expression
 *
 * @path ch12/12.1/S12.1_A4_T2.js
 * @description Checking if execution of "y={x}" fails
 * @negative
 */

x=1;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
y={x};
//
//////////////////////////////////////////////////////////////////////////////

