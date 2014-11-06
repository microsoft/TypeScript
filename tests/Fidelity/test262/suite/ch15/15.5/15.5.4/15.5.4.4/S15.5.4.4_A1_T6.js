// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charAt(pos)
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A1_T6.js
 * @description Call charAt() function with x argument of new String object, where x is undefined variable
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToInteger(undefined) evaluates to 0 charAt() evaluates to charAt(0)
if (new String("lego").charAt(x) !== "l") {
  $ERROR('#1: var x; new String("lego").charAt(x) === "l". Actual: new String("lego").charAt(x) ==='+new String("lego").charAt(x) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

