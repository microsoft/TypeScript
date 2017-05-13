// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A1_T10.js
 * @description Call toUpperCase() function of object with overrode toString function
 */

var __obj = {toString:function(){return "\u0041b";}}
__obj.toUpperCase = String.prototype.toUpperCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.toUpperCase() !=="AB") {
  $ERROR('#1: var __obj = {toString:function(){return "\u0041b";}}; __obj.toUpperCase = String.prototype.toUpperCase; __obj.toUpperCase() ==="AB". Actual: '+__obj.toUpperCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

