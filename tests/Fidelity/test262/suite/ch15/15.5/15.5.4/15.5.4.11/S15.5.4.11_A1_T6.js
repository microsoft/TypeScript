// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.replace (searchValue, replaceValue)
 *
 * @path ch15/15.5/15.5.4/15.5.4.11/S15.5.4.11_A1_T6.js
 * @description Call replace (searchValue, replaceValue) function with x and Function("return arguments[1]+42;") arguments of new String object. x is undefined variable
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (new String("undefined").replace(x,Function("return arguments[1]+42;")) !== "42") {
  $ERROR('#1: var x; new String("undefined").replace(x,Function("return arguments[1]+42;")) === "42". Actual: '+new String("undefined").replace(x,Function("return arguments[1]+42;")) );
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

