// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleLowerCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.17/S15.5.4.17_A1_T5.js
 * @description Call toLocaleLowerCase() function for function call
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(null) evaluates to "null" match(null) evaluates to match("null")
if (function(){return "GnulLuNa"}().toLocaleLowerCase() !== "gnulluna") {
  $ERROR('#1: function(){return "GnulLuNa"}().toLocaleLowerCase() === "gnulluna". Actual: '+function(){return "GnulLuNa"}().toLocaleLowerCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

