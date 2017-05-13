// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.match (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.10/S15.5.4.10_A1_T10.js
 * @description Call match (regexp) function with object argument
 */

var __obj = {toString:function(){return "\u0041B";}}
var __str = "ABB\u0041BABAB";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
with(__str){
    if (match(__obj)[0] !=="AB") {
      $ERROR('#1: var x; var __obj = {toString:function(){return "\u0041B";}}; var __str = "ABB\u0041BABAB"; match(__obj)[0] ==="AB". Actual: '+match(__obj)[0] );
    }
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

