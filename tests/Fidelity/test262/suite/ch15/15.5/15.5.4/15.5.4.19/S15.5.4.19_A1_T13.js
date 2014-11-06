// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.19/S15.5.4.19_A1_T13.js
 * @description Override toString and valueOf functions, then call toLocaleUpperCase() function for this object
 */

var __obj = {toString:function(){return {};},valueOf:function(){return 1;}}
__obj.toLocaleUpperCase = String.prototype.toLocaleUpperCase;
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.toLocaleUpperCase() !=="1") {
  $ERROR('#1: var __obj = {toString:function(){return {};},valueOf:function(){return 1;}}; __obj.toLocaleUpperCase = String.prototype.toLocaleUpperCase; __obj.toLocaleUpperCase() ==="1". Actual: '+__obj.toLocaleUpperCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__obj.toLocaleUpperCase().length !== 1) {
  $ERROR('#2: var __obj = {toString:function(){return {};},valueOf:function(){return 1;}}; __obj.toLocaleUpperCase = String.prototype.toLocaleUpperCase; __obj.toLocaleUpperCase().length === 1. Actual: '+__obj.toLocaleUpperCase().length );
}
//
//////////////////////////////////////////////////////////////////////////////

