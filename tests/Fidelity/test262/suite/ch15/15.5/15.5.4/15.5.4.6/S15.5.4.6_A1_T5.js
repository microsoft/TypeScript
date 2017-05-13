// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.concat([,[...]])
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A1_T5.js
 * @description Call concat([,[...]]) function with null argument of function object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(null) evaluates to "null" concat(null) evaluates to concat("null")
if (function(){return "lego"}().concat(null) !== "legonull") {
  $ERROR('#1: function(){return "lego"}().concat(null) === "legonull". Actual: '+function(){return "lego"}().concat(null) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

