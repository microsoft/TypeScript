// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * when String.prototype.lastIndexOf(searchString, position) is called first Call ToString, giving it the this value as its argument.
 * Then Call ToString(searchString) and Call ToNumber(position)
 *
 * @path ch15/15.5/15.5.4/15.5.4.8/S15.5.4.8_A4_T3.js
 * @description Override toString and valueOf functions
 */

var __obj = {toString:function(){return "\u0041B";}}
var __obj2 = {valueOf:function(){return {};},toString:function(){}}

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ("ABB\u0041BABAB".lastIndexOf(__obj, __obj2)!==7) {
  $ERROR('#1: var __obj = {toString:function(){return "\u0041B";}}; var __obj2 = {valueOf:function(){return {};},toString:function(){}}; "ABB\\u0041BABAB".lastIndexOf(__obj, __obj2)===7. Actual: '+("ABB\u0041BABAB".lastIndexOf(__obj, __obj2)));
}
//
//////////////////////////////////////////////////////////////////////////////

