// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A1_T6.js
 * @description Arguments are x and number, and instance is new String, x is undefined variable
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (new String("undefined").substring(x,3) !== "und") {
  $ERROR('#1: var x; new String("undefined").substring(x,3) === "und". Actual: '+new String("undefined").substring(x,3) );
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

