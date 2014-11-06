// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * match returns array as specified in 15.10.6.2
 *
 * @path ch15/15.5/15.5.4/15.5.4.10/S15.5.4.10_A2_T7.js
 * @description Regular expression is /([\d]{5})([-\ ]?[\d]{4})?$/g
 */

var __matches=["02134"];

var __string = "Boston, Mass. 02134";

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__string.match(/([\d]{5})([-\ ]?[\d]{4})?$/g).length!== 1) {
  $ERROR('#1: __string = "Boston, Mass. 02134"; __string.match(/([\\d]{5})([-\\ ]?[\\d]{4})?$/g).length=== 1. Actual: '+__string.match(/([\d]{5})([-\ ]?[\d]{4})?$/g).length);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__string.match(/([\d]{5})([-\ ]?[\d]{4})?$/g)[0]!==__matches[0]) {
  $ERROR('#2: __matches=["02134"]; __string = "Boston, Mass. 02134"; __string.match(/([\\d]{5})([-\\ ]?[\\d]{4})?$/g)[0]===__matches[0]. Actual: '+__string.match(/([\d]{5})([-\ ]?[\d]{4})?$/g)[0]);
}
//
//////////////////////////////////////////////////////////////////////////////

