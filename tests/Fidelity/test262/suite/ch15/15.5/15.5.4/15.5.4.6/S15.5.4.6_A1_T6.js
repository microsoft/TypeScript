// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.concat([,[...]])
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A1_T6.js
 * @description Call concat([,[...]]) function with x argument of new String object, where x is undefined variable
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(undefined) evaluates to "undefined" concat(undefined) evaluates to concat("undefined")
if (new String("lego").concat(x) !== "legoundefined") {
  $ERROR('#1: var x; new String("lego").concat(x) === "legoundefined". Actual: '+new String("lego").concat(x) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

