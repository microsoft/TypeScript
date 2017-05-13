// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.match.length property has the attribute ReadOnly
 *
 * @path ch15/15.5/15.5.4/15.5.4.10/S15.5.4.10_A10.js
 * @description Checking if varying the String.prototype.match.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.match.hasOwnProperty('length'))) {
  $FAIL('#1: String.prototype.match.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.match.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

var __obj = String.prototype.match.length;

String.prototype.match.length = function(){return "shifted";};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.match.length !== __obj) {
  $ERROR('#2: __obj = String.prototype.match.length; String.prototype.match.length = function(){return "shifted";}; String.prototype.match.length === __obj. Actual: '+String.prototype.match.length );
}
//
//////////////////////////////////////////////////////////////////////////////

