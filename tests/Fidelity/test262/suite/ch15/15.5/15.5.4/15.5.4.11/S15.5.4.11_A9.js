// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.replace.length property has the attribute DontDelete
 *
 * @path ch15/15.5/15.5.4/15.5.4.11/S15.5.4.11_A9.js
 * @description Checking if deleting the String.prototype.replace.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#0
if (!(String.prototype.replace.hasOwnProperty('length'))) {
  $FAIL('#0: String.prototype.replace.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.replace.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (delete String.prototype.replace.length) {
  $ERROR('#1: delete String.prototype.replace.length return false');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (!(String.prototype.replace.hasOwnProperty('length'))) {
  $FAIL('#2: delete String.prototype.replace.length; String.prototype.replace.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.replace.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

