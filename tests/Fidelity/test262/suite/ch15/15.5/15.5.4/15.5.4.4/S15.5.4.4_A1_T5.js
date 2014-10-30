// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charAt(pos)
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A1_T5.js
 * @description Call charAt() function with null argument of function object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToInteger(null) evaluates to 0 charAt() evaluates to charAt(0)
if (function(){return "lego"}().charAt(null) !== "l") {
  $ERROR('#1: function(){return "lego"}().charAt(null) === "l". Actual: function(){return "lego"}().charAt(null) ==='+function(){return "lego"}().charAt(null) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

