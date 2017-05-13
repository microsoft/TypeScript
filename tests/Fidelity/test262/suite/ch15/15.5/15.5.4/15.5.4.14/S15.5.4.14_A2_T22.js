// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split (separator, limit) returns an Array object into which substrings of the result of converting this object to a string have
 * been stored. The substrings are determined by searching from left to right for occurrences of
 * separator; these occurrences are not part of any substring in the returned array, but serve to divide up
 * the string value. The value of separator may be a string of any length or it may be a RegExp object
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A2_T22.js
 * @description Call split("l"), instance is String("hello")
 */

var __string = new String("hello");

var __split = __string.split("l");

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: var __string = new String("hello"); __split = __string.split("l"); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== 3) {
  $ERROR('#2: var __string = new String("hello"); __split = __string.split("l"); __split.length === 3. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split[0] !== "he") {
  $ERROR('#3: var __string = new String("hello"); __split = __string.split("l"); __split[0] === "he". Actual: '+__split[0]);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__split[1] !== "") {
  $ERROR('#4: var __string = new String("hello"); __split = __string.split("l"); __split[1] === "". Actual: '+__split[1]);
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#5
if (__split[2] !== "o") {
  $ERROR('#5: var __string = new String("hello"); __split = __string.split("l"); __split[2] === "o". Actual: '+__split[2] );
}
//
//////////////////////////////////////////////////////////////////////////////


