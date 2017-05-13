// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLowerCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.16/S15.5.4.16_A1_T13.js
 * @description Override toString and valueOf functions, then call toLowerCase() function for this object
 */

var __obj = {toString:function(){return {};},valueOf:function(){return 1;}}
__obj.toLowerCase = String.prototype.toLowerCase;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__obj.toLowerCase() !=="1") {
  $ERROR('#1: var __obj = {toString:function(){return {};},valueOf:function(){return 1;}}; __obj.toLowerCase = String.prototype.toLowerCase; __obj.toLowerCase() ==="1". Actual: '+__obj.toLowerCase() );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__obj.toLowerCase().length !== 1) {
  $ERROR('#2: var __obj = {toString:function(){return {};},valueOf:function(){return 1;}}; __obj.toLowerCase = String.prototype.toLowerCase; __obj.toLowerCase().length === 1. Actual: '+__obj.toLowerCase().length );
}
//
//////////////////////////////////////////////////////////////////////////////

