// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.charCodeAt(pos)
 *
 * @path ch15/15.5/15.5.4/15.5.4.5/S15.5.4.5_A1_T5.js
 * @description Call charCodeAt() function with null argument of function object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToInteger(null) evaluates to 0 charCodeAt() evaluates to charCodeAt(0)
if (function(){return "lego"}().charCodeAt(null) !== 0x6C) {
  $ERROR('#1: function(){return "lego"}().charCodeAt(null) === 0x6C. Actual: '+function(){return "lego"}().charCodeAt(null) ); 
}
//
//////////////////////////////////////////////////////////////////////////////

