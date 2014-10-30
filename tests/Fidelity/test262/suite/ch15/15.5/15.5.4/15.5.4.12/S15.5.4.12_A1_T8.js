// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp)
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A1_T8.js
 * @description Argument is void 0, and instance is String object with overrided toString function
 */

var __obj = {toString:function(){}};

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
//since ToString(void 0) evaluates to "undefined" search(void 0) evaluates to search("undefined")
if (String(__obj).search(void 0) !== 0) {
  $ERROR('#1: __obj = {toString:function(){}}; String(__obj).search(void 0) === 0. Actual: '+String(__obj).search(void 0) );
}
//
//////////////////////////////////////////////////////////////////////////////

