// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.concat([,[...]])
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A1_T10.js
 * @description Call concat([,[...]]) function with object arguments
 */

var __obj = {toString:function(){return "\u0041";}}
var __obj2 = {toString:function(){return true;}}
var __obj3 = {toString:function(){return 42;}}
var __str = "lego";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
with(__str){
    if (concat(__obj, __obj2, __obj3, x) !== "legoAtrue42undefined") {
      $ERROR('#1: var x; var __obj = {toString:function(){return "\u0041";}}; var __obj2 = {toString:function(){return true;}}; var __obj3 = {toString:function(){return 42;}}; var __str = "lego"; concat(__obj, __obj2, __obj3, x) === "legoAtrue42undefined". Actual: '+concat(__obj, __obj2, __obj3, x) ); 
    }
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

