// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The String.prototype.charAt.length property has the attribute DontEnum
 *
 * @path ch15/15.5/15.5.4/15.5.4.4/S15.5.4.4_A8.js
 * @description Checking if enumerating the String.prototype.charAt.length property fails
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#0
if (!(String.prototype.charAt.hasOwnProperty('length'))) {
  $ERROR('#0: String.prototype.charAt.hasOwnProperty(\'length\') return true. Actual: '+String.prototype.charAt.hasOwnProperty('length')); 
}
//
//////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////
// CHECK#1
if (String.prototype.charAt.propertyIsEnumerable('length')) {
  $ERROR('#1: String.prototype.charAt.propertyIsEnumerable(\'length\') return false. Actual: '+String.prototype.charAt.propertyIsEnumerable('length'));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
// CHECK#2
var count=0;

for (p in String.prototype.charAt){
  if (p==="length") count++;
}

if (count !== 0) {
  $ERROR('#2: count=0; for (p in String.prototype.charAt){if (p==="length") count++;}; count === 0. Actual: count ==='+count ); 
}
//
//////////////////////////////////////////////////////////////////////////////

