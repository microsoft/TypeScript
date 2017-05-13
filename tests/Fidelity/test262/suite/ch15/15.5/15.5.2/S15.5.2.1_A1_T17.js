// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * When "String" is called as part of a new expression, it is a constructor: it initialises the newly created object and
 * The [[Value]] property of the newly constructed object is set to ToString(value), or to the empty string if value is not supplied
 *
 * @path ch15/15.5/15.5.2/S15.5.2.1_A1_T17.js
 * @description Creating string object with "new String()" initialized with numbers that have more than 1 significant digit following the point
 */

var __str = new String(1.2345);
//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof __str !== "object") {
  $ERROR('#1: __str = new String(1.2345); typeof __str === "object". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#1.5
if (__str.constructor !== String) {
  $ERROR('#1.5: __str = new String(1.2345); __str.constructor === String. Actual: __str.constructor ==='+__str.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__str !="1.2345") {
  $ERROR('#2: __str = new String(1.2345); __str =="1.2345". Actual: __str =='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

__str = new String(1.234567890);
//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (typeof __str !== "object") {
  $ERROR('#3: __str = new String(1.234567890); typeof __str === "object". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3.5
if (__str.constructor !== String) {
  $ERROR('#3.5: __str = new String(1.234567890); __str.constructor === String. Actual: __str.constructor ==='+__str.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__str !="1.23456789") {
  $ERROR('#4: __str = new String(1.234567890); __str =="1.23456789". Actual: __str =='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

__str = new String(1.234500000000000000000000000);
//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (typeof __str !== "object") {
  $ERROR('#5: __str = new String(1.234500000000000000000000000); typeof __str === "object". Actual: typeof __str ==='+typeof __str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5.5
if (__str.constructor !== String) {
  $ERROR('#5.5: __str = new String(1.234500000000000000000000000); __str.constructor === String. Actual: __str.constructor ==='+__str.constructor ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#6
if (__str !="1.2345") {
  $ERROR('#6: __str = new String(1.234500000000000000000000000); __str =="1.2345". Actual: __str =='+__str ); 
}
//
//////////////////////////////////////////////////////////////////////////////

