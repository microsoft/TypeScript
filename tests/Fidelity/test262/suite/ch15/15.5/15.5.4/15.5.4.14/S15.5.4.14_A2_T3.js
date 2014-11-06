// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split (separator, limit) returns an Array object into which substrings of the result of converting this object to a string have
 * been stored. The substrings are determined by searching from left to right for occurrences of
 * separator; these occurrences are not part of any substring in the returned array, but serve to divide up
 * the string value. The value of separator may be a string of any length or it may be a RegExp object
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A2_T3.js
 * @description Call split(/ /,2), instance is String("one two three four five")
 */

var __string = new String("one two three four five");

var __split = __string.split(/ /,2);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: var __string = new String("one two three four five"); __split = __string.split(/ /,2); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== 2) {
  $ERROR('#2: var __string = new String("one two three four five"); __split = __string.split(/ /,2); __split.length === 2. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
if (__split[0] !== "one") {
  $ERROR('#3: var __string = new String("one two three four five"); __split = __string.split(/ /,2); __split[0] === "one". Actual: '+__split[0] );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#4
if (__split[1] !== "two") {
  $ERROR('#4: var __string = new String("one two three four five"); __split = __string.split(/ /,2); __split[1] === "two". Actual: '+__split[1] );
}
//
//////////////////////////////////////////////////////////////////////////////

