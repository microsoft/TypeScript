// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.split.length property has the attribute ReadOnly
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A10.js
 * @description Checking if varying the String.prototype.split.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.split.hasOwnProperty('length'))) {
  $FAIL('#1: String.prototype.split.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.split.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

var __obj = String.prototype.split.length;

String.prototype.split.length = function(){return "shifted";};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.split.length !== __obj) {
  $ERROR('#2: __obj = String.prototype.split.length; String.prototype.split.length = function(){return "shifted";}; String.prototype.split.length === __obj. Actual: '+String.prototype.split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

