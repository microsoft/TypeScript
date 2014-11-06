// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * length property has the attributes {ReadOnly}
 *
 * @path ch15/15.5/15.5.5/S15.5.5.1_A4.js
 * @description Checking if varying the length property of String fails
 */

var __str__instance = new String("globglob");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (!(__str__instance.hasOwnProperty("length"))) {
  $ERROR('#1: var __str__instance = new String("globglob"); __str__instance.hasOwnProperty("length") return true. Actual: '+__str__instance.hasOwnProperty("length"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str__instance.length !== 8) {
  $ERROR('#2: var __str__instance = new String("globglob"); __str__instance.length === 8. Actual: __str__instance.length ==='+__str__instance.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

__str__instance.length=-1;

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__str__instance.length !== 8) {
  $ERROR('#3: var __str__instance = new String("globglob"); __str__instance.length=-1; __str__instance.length === 8(after redefine length property). Actual: __str__instance.length ==='+__str__instance.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

with(__str__instance)
    length = 0;
    
//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__str__instance.length !== 8) {
  $ERROR('#4: var __str__instance = new String("globglob"); with(__str__instance) length = 0; __str__instance.length === 8(after redefine length property with using "with"). Actual: __str__instance.length ==='+__str__instance.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

__str__instance.length++;

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (__str__instance.length !== 8) {
  $ERROR('#5: var __str__instance = new String("globglob"); __str__instance.length++; __str__instance.length === 8(after redefine length property with using "++"). Actual: __str__instance.length ==='+__str__instance.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////

