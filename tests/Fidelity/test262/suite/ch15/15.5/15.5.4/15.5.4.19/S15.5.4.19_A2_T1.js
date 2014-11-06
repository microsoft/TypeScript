// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.toLocaleUpperCase() return a string, but not a String object
 *
 * @path ch15/15.5/15.5.4/15.5.4.19/S15.5.4.19_A2_T1.js
 * @description Checking returned result
 */

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if ("Hello, WoRlD!".toLocaleUpperCase() !== "HELLO, WORLD!") {
  $ERROR('#1: "Hello, WoRlD!".toLocaleUpperCase() === "HELLO, WORLD!". Actual: '+("Hello, WoRlD!".toLocaleUpperCase()) );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if ("Hello, WoRlD!".toLocaleUpperCase() !== String("HELLO, WORLD!")) {
  $ERROR('#2: "Hello, WoRlD!".toLocaleUpperCase() === String("HELLO, WORLD!"). Actual: '+("Hello, WoRlD!".toLocaleUpperCase()) );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if ("Hello, WoRlD!".toLocaleUpperCase() ===new String("HELLO, WORLD!")) {
  $ERROR('#3: "Hello, WoRlD!".toLocaleUpperCase() !== new String("HELLO, WORLD!"');
}
//
//////////////////////////////////////////////////////////////////////////////

