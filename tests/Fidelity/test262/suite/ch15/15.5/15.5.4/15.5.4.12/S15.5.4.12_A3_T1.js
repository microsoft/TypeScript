// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.search (regexp) ignores global properties of regexp
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A3_T1.js
 * @description Checking results of search regexp with and without global properties
 */

var aString = new String("power of the power of the power of the power of the power of the power of the great sword");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (aString.search(/the/)!== aString.search(/the/g)) {
  $ERROR('#1: var aString = new String("power of the power of the power of the power of the power of the power of the great sword"); aString.search(/the/)=== aString.search(/the/g). Actual: '+aString.search(/the/));
}
//
//////////////////////////////////////////////////////////////////////////////

