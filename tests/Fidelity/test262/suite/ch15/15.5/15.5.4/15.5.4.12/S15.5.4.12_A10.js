// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.search.length property has the attribute ReadOnly
 *
 * @path ch15/15.5/15.5.4/15.5.4.12/S15.5.4.12_A10.js
 * @description Checking if varying the String.prototype.search.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.search.hasOwnProperty('length'))) {
  $FAIL('#1: String.prototype.search.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.search.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

var __obj = String.prototype.search.length;

String.prototype.search.length = function(){return "shifted";};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.search.length !== __obj) {
  $ERROR('#2: __obj = String.prototype.search.length; String.prototype.search.length = function(){return "shifted";}; String.prototype.search.length === __obj. Actual: '+String.prototype.search.length );
}
//
//////////////////////////////////////////////////////////////////////////////

