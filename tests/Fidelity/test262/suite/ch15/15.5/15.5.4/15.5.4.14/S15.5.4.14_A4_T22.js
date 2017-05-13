// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/**
 * String.prototype.split (separator, limit) returns an Array object into which substrings of the result of converting this object to a string have
 * been stored. If separator is a regular expression then
 * inside of SplitMatch helper the [[Match]] method of R is called giving it the arguments corresponding
 *
 * @path ch15/15.5/15.5.4/15.5.4.14/S15.5.4.14_A4_T22.js
 * @description Argument is regexp /\d+/, and instance is String("dfe23iu 34 =+65--")
 */

var __string = new String("dfe23iu 34 =+65--");

var __re = /\d+/;

var __split = __string.split(__re);

var __expected = ["dfe","iu "," =+","--"];

//////////////////////////////////////////////////////////////////////////////
//CHECK#1
if (__split.constructor !== Array) {
  $ERROR('#1: __split.constructor === Array. Actual: '+__split.constructor );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#2
if (__split.length !== __expected.length) {
  $ERROR('#2: __split.length === __expected.length. Actual: '+__split.length );
}
//
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//CHECK#3
for(var index=0; index<__expected.length; index++) {
  if (__split[index] !== __expected[index]) {
    $ERROR('#3.'+index+': __split['+index+'] === '+__expected[index]+'. Actual: '+__split[index] );
  }
}
//
//////////////////////////////////////////////////////////////////////////////

