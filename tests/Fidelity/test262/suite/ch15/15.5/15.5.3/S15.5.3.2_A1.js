// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * The length property of the fromCharCode function is 1
 *
 * @path ch15/15.5/15.5.3/S15.5.3.2_A1.js
 * @description Checking String.fromCharCode.length
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (typeof String.fromCharCode !== "function") {
  $ERROR('#1: typeof String.fromCharCode === "function". Actual: typeof String.fromCharCode ==='+typeof String.fromCharCode ); 
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (!(String.hasOwnProperty("fromCharCode"))) {
  $ERROR('#2: String.hasOwnProperty("fromCharCode") return true. Actual: '+String.hasOwnProperty("fromCharCode"));
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (String.fromCharCode.length !== 1) {
  $ERROR('#3: String.fromCharCode.length === 1. Actual: String.fromCharCode.length ==='+String.fromCharCode.length ); 
}
//
//////////////////////////////////////////////////////////////////////////////


