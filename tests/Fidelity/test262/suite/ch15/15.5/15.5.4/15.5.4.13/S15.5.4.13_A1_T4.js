// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.slice (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.13/S15.5.4.13_A1_T4.js
 * @description Arguments are null and number, and instance is function call, that returned string
 */

//since ToInteger(null) yelds 0
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (function(){return "gnulluna"}().slice(null, -3) !== "gnull") {
  $ERROR('#1: function(){return "gnulluna"}().slice(null, -3) === "gnull". Actual: '+function(){return "gnulluna"}().slice(null, -3) );
}
//
//////////////////////////////////////////////////////////////////////////////

