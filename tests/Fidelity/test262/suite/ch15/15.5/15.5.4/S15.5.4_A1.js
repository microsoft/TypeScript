// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String prototype object is itself a String object (its [[Class]] is "String")
 *
 * @path ch15/15.5/15.5.4/S15.5.4_A1.js
 * @description first we delete String.prototype.toString cause it overrides Object prototype toString.
 * Object.prototype.toString returns [object+[[class]]+]
 */

delete String.prototype.toString;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (String.prototype.toString() !== "[object "+"String"+"]") {
  $ERROR('#1: delete String.prototype.toString; String.prototype.toString() === "[object "+"String"+"]". Actual: String.prototype.toString() ==='+String.prototype.toString() ); 
}
//
//////////////////////////////////////////////////////////////////////////////

