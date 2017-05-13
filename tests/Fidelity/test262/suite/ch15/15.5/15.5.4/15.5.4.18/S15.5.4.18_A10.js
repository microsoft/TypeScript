// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.toUpperCase.length property has the attribute ReadOnly
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A10.js
 * @description Checking if varying the String.prototype.toUpperCase.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.toUpperCase.hasOwnProperty('length'))) {
  $FAIL('#1: String.prototype.toUpperCase.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.toUpperCase.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

var __obj = String.prototype.toUpperCase.length;

String.prototype.toUpperCase.length = function(){return "shifted";};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.toUpperCase.length !== __obj) {
  $ERROR('#2: __obj = String.prototype.toUpperCase.length; String.prototype.toUpperCase.length = function(){return "shifted";}; String.prototype.toUpperCase.length === __obj. Actual: '+String.prototype.toUpperCase.length );
}
//
//////////////////////////////////////////////////////////////////////////////

