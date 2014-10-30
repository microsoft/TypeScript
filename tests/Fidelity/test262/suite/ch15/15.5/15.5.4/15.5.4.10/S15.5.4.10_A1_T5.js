// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.match (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.10/S15.5.4.10_A1_T5.js
 * @description Call match (regexp) function with null argument of function object
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(null) evaluates to "null" match(null) evaluates to match("null")
if (function(){return "gnulluna"}().match(null)[0] !== "null") {
  $ERROR('#1: function(){return "gnulluna"}().match(null)[0] === "null". Actual: '+function(){return "gnulluna"}().match(null)[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

