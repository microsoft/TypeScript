// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When "String" is called as part of a new expression, it is a constructor: it initialises the newly created object and
 * The [[Value]] property of the newly constructed object is set to ToString(value), or to the empty string if value is not supplied
 *
 * @path ch15/15.5/15.5.2/S15.5.2.1_A1_T18.js
 * @description Create string object with "new String()" initialized with numbers that have more than 1 significant digit
 */

var __str = new String(1000000000000000000000);
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __str !== "object") {
  $ERROR('#1: __str = new String(1000000000000000000000); typeof __str === "object". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#1.5
if (__str.constructor !== String) {
  $ERROR('#1.5: __str = new String(1000000000000000000000); __str.constructor === String. Actual: __str.constructor ==='+__str.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str !="1e+21") {
  $ERROR('#2: __str = new String(1000000000000000000000); __str =="1e+21". Actual: __str =='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

__str = new String(10000000000000000000000);
//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (typeof __str !== "object") {
  $ERROR('#3: __str = new String(10000000000000000000000); typeof __str === "object". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3.5
if (__str.constructor !== String) {
  $ERROR('#3.5: __str = new String(10000000000000000000000); __str.constructor === String. Actual: __str.constructor ==='+__str.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__str !="1e+22") {
  $ERROR('#4: __str = new String(10000000000000000000000); __str =="1e+22". Actual: __str =='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

