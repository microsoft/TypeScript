// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A1_T9.js
 * @description Argument is function call, and instance is String object with overrided toString and valueOf functions
 */

var __obj = {
    valueOf:function(){},
    toString:void 0
};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(undefined) evaluates to "undefined" search(undefined) evaluates to search("undefined")
if (new String(__obj).search(function(){}()) !== 0) {
  $ERROR('#1: __obj = {valueOf:function(){}, toString:void 0}; new String(__obj).search(function(){}()) === 0. Actual: '+new String(__obj).search(function(){}()) );
}
//
//////////////////////////////////////////////////////////////////////////////

