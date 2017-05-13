// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Appearing of "return" without a function body leads to syntax error
 *
 * @path ch12/12.9/S12.9_A1_T5.js
 * @description Checking if execution of "return" with no function, placed into a Block, fails
 * @negative
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
{
    var x=1;
    return;
    var y=2;
}
//
//////////////////////////////////////////////////////////////////////////////

