// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.concat.length property has the attribute ReadOnly
 *
 * @path ch15/15.5/15.5.4/15.5.4.6/S15.5.4.6_A10.js
 * @description Checking if varying the String.prototype.concat.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(String.prototype.concat.hasOwnProperty('length'))) {
  $ERROR('#1: String.prototype.concat.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.concat.hasOwnProperty('length')); 
}
//
//////////////////////////////////////////////////////////////////////////////

var __obj = String.prototype.concat.length;

String.prototype.concat.length = function(){return "shifted";};

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (String.prototype.concat.length !== __obj) {
  $ERROR('#2: __obj = String.prototype.concat.length; String.prototype.concat.length = function(){return "shifted";}; String.prototype.concat.length === __obj. Actual: '+String.prototype.concat.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

