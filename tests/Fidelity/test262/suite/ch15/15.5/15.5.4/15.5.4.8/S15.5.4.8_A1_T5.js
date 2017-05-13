// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.lastIndexOf(searchString, position)
 *
 * @path ch15/15.5/15.5.4/15.5.4.8/S15.5.4.8_A1_T5.js
 * @description Call lastIndexOf(searchString, position) function with null argument of function object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(null) evaluates to "null" lastIndexOf(null) evaluates to lastIndexOf("",0)
if (function(){return "gnullunazzgnull"}().lastIndexOf(null) !== 11) {
  $ERROR('#1: function(){return "gnullunazzgnull"}().lastIndexOf(null) === 11. Actual: '+function(){return "gnullunazzgnull"}().lastIndexOf(null) );
}
//
//////////////////////////////////////////////////////////////////////////////

