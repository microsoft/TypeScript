// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * Both unicode and ascii chars are allowed
 *
 * @path ch08/8.4/S8.4_A10.js
 * @description Create string using both unicode and ascii chars
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
var __str = "\u0041A\u0042B\u0043C";
if (__str !== 'AABBCC'){
  $ERROR('#1: var __str = "\\u0041A\\u0042B\\u0043C"; __str === \'AABBCC\'. Actual: ' + (__str));
};
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
var __str__ = "\u0041\u0042\u0043"+'ABC';
if (__str__ !== 'ABCABC'){
  $ERROR('#2: var __str__ = "\\u0041\\u0042\\u0043"+\'ABC\'; __str__ === \'ABCABC\'. Actual: ' + (__str__));
};
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
var str__ = "ABC"+'\u0041\u0042\u0043';
if (str__ !== "ABCABC"){
  $ERROR('#2: var str__ = "ABC"+\'\\u0041\\u0042\\u0043\'; str__ === "ABCABC". Actual: ' + (str__));
};
//
//////////////////////////////////////////////////////////////////////////////

