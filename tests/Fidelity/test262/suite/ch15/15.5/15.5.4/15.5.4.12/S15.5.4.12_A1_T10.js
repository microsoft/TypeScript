// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A1_T10.js
 * @description Argument is object, and instance is string.
 * Object with overrided toString function
 */

var __obj = {toString:function(){return "\u0041B";}};
var __str = "ssABB\u0041BABAB";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
with(__str){
  if (search(__obj) !==2) {
    $ERROR('#1: var __obj = {toString:function(){return "\u0041B";}}; var __str = "ssABB\u0041BABAB"; search(__obj) ===2. Actual: '+search(__obj) );
  }
}
//
//////////////////////////////////////////////////////////////////////////////

var x;

