// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split() returns an Array object with:
 *  i) length equaled to 1,
 * ii) [[Get]](0) equaled to the result of converting this object to a string
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A3_T1.js
 * @description Instance is String("one,two,three,four,five")
 */

var __string = new String("one,two,three,four,five");

var __split = __string.split();

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: var __string = new String("one,two,three,four,five"); __split = __string.split(); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== 1) {
  $ERROR('#2: var __string = new String("one,two,three,four,five"); __split = __string.split(); __split.length === 1. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split[0] !== "one,two,three,four,five") {
  $ERROR('#3: var __string = new String("one,two,three,four,five"); __split = __string.split(); __split[0] === "one,two,three,four,five". Actual: '+__split[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

