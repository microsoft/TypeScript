// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.substring (start, end)
 *
 * @path ch15/15.5/15.5.4/15.5.4.15/S15.5.4.15_A1_T10.js
 * @description Arguments are object and function call, and instance is String, object have overrided valueOf function
 */

var __obj = {valueOf:function(){return 2;}};

var __str = "\u0035ABBBABAB";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
with(__str){
    if (substring(__obj, function(){return substring(0,1);}()) !== "BBB") {
      $ERROR('#1: var __obj = {valueOf:function(){return 2;}}; var __str = "\u0035ABBBABAB"; substring(__obj, function(){return substring(0,1);}()) === "BBB". Actual: '+substring(__obj, function(){return substring(0,1);}()) );
    }
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

