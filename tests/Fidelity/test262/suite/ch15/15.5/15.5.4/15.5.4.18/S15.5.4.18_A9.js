// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.toUpperCase.length property has the attribute DontDelete
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A9.js
 * @description Checking if deleting the String.prototype.toUpperCase.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#0
if (!(String.prototype.toUpperCase.hasOwnProperty('length'))) {
  $FAIL('#0: String.prototype.toUpperCase.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.toUpperCase.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (delete String.prototype.toUpperCase.length) {
  $ERROR('#1: delete String.prototype.toUpperCase.length return false');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (!(String.prototype.toUpperCase.hasOwnProperty('length'))) {
  $FAIL('#2: delete String.prototype.toUpperCase.length; String.prototype.toUpperCase.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.toUpperCase.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

