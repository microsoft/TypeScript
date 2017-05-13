// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toUpperCase()
 *
 * @path ch15/15.5/15.5.4/15.5.4.18/S15.5.4.18_A1_T4.js
 * @description Call toUpperCase() function without arguments of string and from empty string
 */

var __lowerCase = "".toUpperCase();

var __expected = ""; 

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__lowerCase.length !== __expected.length) {
  $ERROR('#1: __lowerCase = "".toUpperCase(); __expected = ""; __lowerCase.length === __expected.length. Actual: '+__lowerCase.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__lowerCase.index !== __expected.index) {
  $ERROR('#2: __lowerCase = "".toUpperCase(); __expected = ""; __lowerCase.index === __expected.index. Actual: '+__lowerCase.index );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__lowerCase.input !== __expected.input) {
  $ERROR('#3: __lowerCase = "".toUpperCase(); __expected = ""; __lowerCase.input === __expected.input. Actual: '+__lowerCase.input );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__lowerCase[0]!==__expected[0]) {
  $ERROR('#4: __lowerCase = "".toUpperCase(); __expected = ""; __lowerCase[0]==='+__expected[0]+'. Actual: '+__lowerCase[0]);
}
//
//////////////////////////////////////////////////////////////////////////////

