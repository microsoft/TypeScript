// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.fromCharCode ( [ char0 [ , char1 [ , ... ] ] ] )
 *
 * @path ch15/15.5/15.5.3/S15.5.3.2_A3_T2.js
 * @description Create function variable, that equal String.fromCharCode, delete original String.fromCharCode and use created variable
 */

var __fcc__func = String.fromCharCode;

delete String.fromCharCode;

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__fcc__func(65,66,66,65) !== "ABBA") {
  $ERROR('#1: __fcc__func = String.fromCharCode; delete String.fromCharCode; __fcc__func(65,66,66,65) === "ABBA". Actual: __fcc__func(65,66,66,65) ==='+__fcc__func(65,66,66,65) ); 
}
//
//////////////////////////////////////////////////////////////////////////////


