// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split (separator, limit) returns an Array object into which substrings of the result of converting this object to a string have
 * been stored. The substrings are determined by searching from left to right for occurrences of
 * separator; these occurrences are not part of any substring in the returned array, but serve to divide up
 * the string value. The value of separator may be a string of any length or it may be a RegExp object
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A2_T10.js
 * @description Call split(123), instance is "this123is123a123string123object"
 */

var __string = "this123is123a123string123object";
var __expected = ["this", "is", "a", "string", "object"];

var __split = __string.split(123);

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: var __string = "this123is123a123string123object"; var __expected = ["this", "is", "a", "string", "object"]; __split = __string.split(123); __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== __expected.length) {
  $ERROR('#2: var __string = "this123is123a123string123object"; var __expected = ["this", "is", "a", "string", "object"]; __split = __string.split(123); __split.length === __expected.length. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
for ( var i = 0; i < __expected.length; i++ ) {
    if (__expected[i]!==__split[i]) {
      $ERROR('#3.'+i+': var __string = "this123is123a123string123object"; var __expected = ["this", "is", "a", "string", "object"]; __split = __string.split(123); __expected['+i+']===__split['+i+']. Actual: '+__expected[i]);
    }
}
//
//////////////////////////////////////////////////////////////////////////////


