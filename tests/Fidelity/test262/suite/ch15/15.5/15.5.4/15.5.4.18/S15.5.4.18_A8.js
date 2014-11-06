// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.toUpperCase.length property has the attribute DontEnum
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A8.js
 * @description Checking if enumerating the String.prototype.toUpperCase.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#0
if (!(String.prototype.toUpperCase.hasOwnProperty('length'))) {
  $FAIL('#0: String.prototype.toUpperCase.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.toUpperCase.hasOwnProperty('length'));
}
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// CHECK#1
if (String.prototype.toUpperCase.propertyIsEnumerable('length')) {
  $ERROR('#1: String.prototype.toUpperCase.propertyIsEnumerable(\'length\') return false');
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#2
var count=0;

for (p in String.prototype.toUpperCase){
  if (p==="length") count++;
}

if (count !== 0) {
  $ERROR('#2: count=0; for (p in String.prototype.toUpperCase){if (p==="length") count++;}; count === 0. Actual: '+count );
}
//
//////////////////////////////////////////////////////////////////////////////

