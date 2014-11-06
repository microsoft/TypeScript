// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When "String" is called as part of a new expression, it is a constructor: it initialises the newly created object and
 * The [[Value]] property of the newly constructed object is set to ToString(value), or to the empty string if value is not supplied
 *
 * @path ch15/15.5/15.5.2/S15.5.2.1_A1_T5.js
 * @description Creating string object with "new String(NaN)"
 */

var __str = new String(NaN);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __str !== "object") {
  $ERROR('#1: __str = new String(NaN); typeof __str === "object". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#1.5
if (__str.constructor !== String) {
  $ERROR('#1.5: __str = new String(NaN); __str.constructor === String. Actual: __str.constructor ==='+__str.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str !=(1/"s")+"") {
  $ERROR('#2: __str = new String(NaN); __str ==(1/"s")+"". Actual: __str =='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

